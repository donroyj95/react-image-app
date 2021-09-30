import { Selector, test, fixture } from "testcafe";
import { Category } from '../Category'



// const elementWithId = (id: string): Selector => {
//     return Selector(document.getElementById(id));
// };




fixture`image App`
    .page`http://localhost:3000/`;


test('should dropdown value set to option value', async t => {
    //await t.wait(2000);
    // Starts at http://devexpress.github.io/testcafe/example
    const dropDown = Selector('#dropdown');
    const options = dropDown.find('option');
    //const selection = Selector('#')
    // console.log(dropDown);


    await t
        .click(dropDown)
        .click(options.withText(Category[1]))
        .wait(2000)
        .expect(dropDown.value).eql(Category[1]);

});


test('Test', async t => {
    const dropDown = Selector('#dropdown');
    const options = dropDown.find('option');
    const results = Selector('results-container');
    await t
        .click(dropDown)
        .click(options.withText(Category[1]))
        .wait(2000)


    const res: number = await Selector('#results-container').find('div').filterVisible().count;
    await t.expect(res).eql(10);
    // console.log(res);



})





