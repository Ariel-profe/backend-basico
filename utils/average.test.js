const {average} = require('../utils/for_testing');

describe('average', () =>{
    test('un valor es el valor de la media', ()=>{
        expect(average([])).toBe(0)
    })
})
