import CopyInput from '@/components/ui/CopyInput'
import RangeInput from '@/components/ui/RangeInput'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'

import styles from './PasswordGenerator.module.css'

import usePasswordGenerator from './usePasswordGenerator'

const PasswordGenerator = () => {
  const {
    password,
    charactersLength,
    checkboxError,
    checkboxesState,
    setCharactersLength,
    changeCheckboxesState,
    generatePassword,
  } = usePasswordGenerator()

  return (
    <div className={styles.passwordGenerator}>
      <CopyInput
        value={password}
        disabled
      />
      <p className={styles.charLength}>Characters length {charactersLength}</p>
      <RangeInput
        value={charactersLength}
        onValueChange={setCharactersLength}
      />
      <div className={styles.checkboxes}>
        <Checkbox
          name='lowercase'
          checked={checkboxesState.lowercase}
          label='Include Lowercase'
          onValueChange={changeCheckboxesState}
        />
        <Checkbox
          name='uppercase'
          checked={checkboxesState.uppercase}
          label='Include Uppercase'
          onValueChange={changeCheckboxesState}
        />
        <Checkbox
          name='numbers'
          checked={checkboxesState.numbers}
          label='Include Numbers'
          onValueChange={changeCheckboxesState}
        />
        <Checkbox
          name='symbols'
          checked={checkboxesState.symbols}
          label='Include Symbols'
          onValueChange={changeCheckboxesState}
        />
      </div>
      {checkboxError ? (
        <p className={styles.checkboxError}>
          * Please select at least one checkbox
        </p>
      ) : null}
      <Button
        onClick={generatePassword}
        disabled={checkboxError}
      >
        Generate
      </Button>
    </div>
  )
}

export default PasswordGenerator
