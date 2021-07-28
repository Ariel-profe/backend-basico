
const {palindrome} = require('../utils/for_testing')


test('palindromo de ariel', ()=>{
    const result = palindrome('ariel')

    
    expect(result).toBe('leira')
})

test('palindromo de empty string', ()=>{
    const result = palindrome('')

    
    expect(result).toBe('')
})

test('palindromo de undefined', ()=>{
    const result = palindrome()

    
    expect(result).toBeUndefined()
})