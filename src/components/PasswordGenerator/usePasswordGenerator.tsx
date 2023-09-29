import { useState } from 'react'

import { shuffleString } from './utils'

const CHARACTERS_MAP = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=:;><',
}

const DEFAULT_CHECKBOXES_STATE = {
  lowercase: true,
  uppercase: false,
  numbers: false,
  symbols: false,
} as const

type CheckboxKeys = keyof typeof DEFAULT_CHECKBOXES_STATE

const usePasswordGenerator = () => {
  const [password, setPassword] = useState('')

  const [checkboxesState, setCheckboxesState] = useState(
    DEFAULT_CHECKBOXES_STATE
  )

  const [charactersLength, setCharactersLength] = useState(20)

  const changeCheckboxesState = (c: CheckboxKeys, v: boolean) => {
    const newCheckboxesState = Object.assign({}, checkboxesState, { [c]: v })
    setCheckboxesState(newCheckboxesState)
  }

  const generatePassword = () => {
    const checkedCount = Object.values(checkboxesState).filter(
      (v) => !!v
    ).length

    const eachCharacterSetLength = Math.ceil(charactersLength / checkedCount)

    const resultString = Object.keys(checkboxesState).reduce((acc, k) => {
      if (checkboxesState[k as CheckboxKeys]) {
        const characters = CHARACTERS_MAP[k as CheckboxKeys]
        const res = Array.from(
          { length: eachCharacterSetLength },
          () => characters[Math.floor(Math.random() * characters.length)]
        )
        acc += res.join('')
      }

      return acc.length > charactersLength
        ? acc.slice(0, charactersLength)
        : acc
    }, '')

    setPassword(shuffleString(resultString))
  }

  const checkboxError = !Object.values(checkboxesState).some((v) => v)

  return {
    password,
    charactersLength,
    checkboxError,
    checkboxesState,
    setCharactersLength,
    changeCheckboxesState,
    generatePassword,
  }
}

export default usePasswordGenerator
