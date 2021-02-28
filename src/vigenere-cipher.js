class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type
  }

  _getAlphabet() {
    return 'abcdefghijklmnopqrstuvwxyz'
  }

  _getCode(array) {
    let returnArray = array.map((char) => {
      if (/[a-z]/i.test(char)) {
        return this._getAlphabet().indexOf(char.toLowerCase())
      } else {
        return String(char)
      }
    })

    return returnArray
  }

  _getKeyPhrase(message, key) {
    let offset = 0

    let returnArray = message.map((item, index) => {
      if (/[a-z]/i.test(item)) {
        return key[(index - offset) % key.length]
      } else {
        offset++
        return ''
      }
    })

    return returnArray
  }

  _getResultCode(messageCode, keyPhraseCode, sign) {
    let returnArray = messageCode.map((code, index) => {
      if (typeof code === 'number') {
        return sign === '+'
          ? (code + keyPhraseCode[index]) % 26
          : (code - keyPhraseCode[index] + 26) % 26
      } else {
        return code + keyPhraseCode[index]
      }
    })

    return returnArray
  }

  _getLetters(codeArray) {
    let returnArray = codeArray.map((code) => {
      if (typeof code === 'number') {
        return this._getAlphabet()[code].toUpperCase()
      } else {
        return code
      }
    })
    return returnArray
  }

  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error()
    }

    if (this.type === true) {
      let messageCode = this._getCode([...message])
      // let messageCode = this._getCode([...message].reverse())

      let keyPhrase = this._getKeyPhrase([...message], [...key])
      // let keyPhrase = this._getKeyPhrase([...message].reverse(), [...key])

      let keyPhraseCode = this._getCode(keyPhrase)
      let resultCode = this._getResultCode(messageCode, keyPhraseCode, '+')

      let cypherPhrase = this._getLetters(resultCode).join('')

      return cypherPhrase
    } else {
      let messageCode = this._getCode([...message].reverse())

      let keyPhrase = this._getKeyPhrase([...message].reverse(), [...key])

      let keyPhraseCode = this._getCode(keyPhrase)
      let resultCode = this._getResultCode(messageCode, keyPhraseCode, '+')

      let cypherPhrase = this._getLetters(resultCode).join('')

      return cypherPhrase
    }
  }
  decrypt(cypher, key) {
    if (cypher === undefined || key === undefined) {
      throw new Error()
    }

    if (this.type === true) {
      let cypherCode = this._getCode([...cypher])
      // let cypherCode = this._getCode([...cypher]).reverse()

      let keyPhrase = this._getKeyPhrase([...cypher], [...key])
      let keyPhraseCode = this._getCode(keyPhrase)
      let resultCode = this._getResultCode(cypherCode, keyPhraseCode, '-')
      let message = this._getLetters(resultCode).join('')
      return message
    } else {
      let cypherCode = this._getCode([...cypher]).reverse()

      let keyPhrase = this._getKeyPhrase([...cypher].reverse(), [...key])
      let keyPhraseCode = this._getCode(keyPhrase)
      let resultCode = this._getResultCode(cypherCode, keyPhraseCode, '-')
      let message = this._getLetters(resultCode).join('')
      return message
    }
  }
}

module.exports = VigenereCipheringMachine

/*
Криптография — это здорово! Давайте попробуем наладить производство шифровальных машин. Наши машины будут использовать один из методов шифрования, которые легки для понимания, но не могут быть разгаданы посредством простого криптоанализа — [**шифр Виженера**](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher).

Наша машина будет иметь 2 модификации: **прямая** и **обратная** (тип машины определяется в момент создания). **Прямая** машина просто шифрует и дешифрует строку, переданную в нее, а **обратная** машина возвращает **перевернутую** задом наперед строку после шифрования и дешифрования.

Ваша задача — реализовать класс `VigenereCipheringMachine`. `constructor` этого класса принимает `true` (**или ничего**), чтобы создать **прямую** машину и `false`, чтобы создать **обратную** машину.
Каждый экземляр `VigenereCipheringMachine` должен иметь 2 метода: `encrypt` и `decrypt`.

Метод `encrypt` принимает 2 параметра: `message` (строка, чтобы ее зашифровать) и `key` (строку-кодовое слово).

Метод `decrypt` принимает 2 параметра: `message` (строка, чтобы ее расшифровать) и `key` (строку-кодовое слово)

Эти параметры для обоих методов являются **обязательными**. Если хотя бы один из них не был передан, должна быть выброшена ошибка. Машины шифруют и дешифруют **только символы латинского алфавита** (другие символы не изменяются). Строка, возвращаемая этими методами, должна иметь **верхний регистр**.

Вам не нужно валидировать значение, переданное в `contructor` и в методы `encrypt` и `decrypt` (за исключением выбрасывания ошибки при отсутствии аргумента для для этих методов).

Например:

`const directMachine = new VigenereCipheringMachine();`

`const reverseMachine = new VigenereCipheringMachine(false);`

`directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'`

`directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'`

`reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'`

`reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'`
*/
