class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type
  }
  encrypt(message, key) {
    const messageArray = [...message]
    const keyString = []

    for (let i = 0; i < message.length; i++) {
      keyString.push(i >= key.length ? key[i - key.length] : key[i])
    }
  }
  decrypt(message, key) {}
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
