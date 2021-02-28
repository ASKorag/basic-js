class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type
  }

  _checkInputData(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error()
    }
  }

  _getAlphabet() {
    return 'abcdefghijklmnopqrstuvwxyz'
  }

  _getCode(arr) {
    const returnArr = arr.map((char) => {
      if (/[a-z]/i.test(char)) {
        return this._getAlphabet().indexOf(char.toLowerCase())
      } else {
        return String(char)
      }
    })

    return returnArr
  }

  _getKeyPhrase(message, key) {
    let offset = 0

    const returnArr = message.map((item, index) => {
      if (/[a-z]/i.test(item)) {
        return key[(index - offset) % key.length]
      } else {
        offset++
        return ''
      }
    })

    return returnArr
  }

  _getResultCode(messageCode, keyPhraseCode, sign) {
    const returnArr = messageCode.map((code, index) => {
      if (typeof code === 'number') {
        return sign === '+'
          ? (code + keyPhraseCode[index]) % 26
          : (code - keyPhraseCode[index] + 26) % 26
      } else {
        return code + keyPhraseCode[index]
      }
    })

    return returnArr
  }

  _getPhrase(codeArr) {
    const phrase = codeArr
      .map((code) => {
        if (typeof code === 'number') {
          return this._getAlphabet()[code].toUpperCase()
        } else {
          return code
        }
      })
      .join('')

    return phrase
  }

  _crypt(message, key, sign) {
    const messageArr =
      this.type === true ? [...message] : [...message].reverse()
    const messageCode = this._getCode(messageArr)

    const keyPhrase = this._getKeyPhrase(messageArr, [...key])
    const keyPhraseCode = this._getCode(keyPhrase)

    const resultCode = this._getResultCode(messageCode, keyPhraseCode, sign)

    return this._getPhrase(resultCode)
  }

  encrypt(message, key) {
    this._checkInputData(message, key)

    return this._crypt(message, key, '+')
  }

  decrypt(encryptedMessage, key) {
    this._checkInputData(encryptedMessage, key)

    return this._crypt(encryptedMessage, key, '-')
  }
}

module.exports = VigenereCipheringMachine
