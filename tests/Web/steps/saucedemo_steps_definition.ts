import { SauceDemoStepHelpers } from '../web_helpers/step_helpers';
const { I } = inject();
const sauceHelper = new SauceDemoStepHelpers(I);

Given ('the user is logged in as {string}', async (userType: string) => {
    await I.loginAs(userType);
});

When ('the user adds all the items to the cart', async () => {
    const itemsToAdd = [
        'sauce-labs-backpack',
        'sauce-labs-bike-light',
        'sauce-labs-bolt-t-shirt',
        'sauce-labs-fleece-jacket',
        'sauce-labs-onesie',
        'test.allthethings()-t-shirt-(red)'
    ]
    await sauceHelper.addItemsToCart(itemsToAdd);
})

When ('the user navigate to view cart page', async () => {
    await sauceHelper.goToCart()
})

When ('the user remove the 3rd item by name in the cart', async (itemName: string) => {
    await sauceHelper.validateSortedItemsByName('asc')
    await sauceHelper.removeItemByName('Sauce Labs Bolt T-Shirt')
})

When ('the user navigate to Checkout Overview page', async () => {
    await sauceHelper.navigateToCheckoutOverview();
    await sauceHelper.fillOutYourInfomationDetails();
    await sauceHelper.validateCheckoutOverviewPage();
})

When ('the user validate the items and number of items added to the cart', async () => {
    const expectedItemsInCart = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ];
    await sauceHelper.validateItemsInCheckoutOverview(expectedItemsInCart);
})

Then ('the user finished the purchase of the items', async () => {
    await sauceHelper.finishPurchaseOfItems();
})

Then ('the user validate purchase of items was successful', async () => {
    await sauceHelper.validateSuccessfulOrder();
})

When ('the user clicks on an item', async () => {
    await sauceHelper.clickItemToView('Sauce Labs Bolt T-Shirt');
})

When ('the user add the item to cart', async () => {
    await sauceHelper.addItemToCartViaItemDetailsPage();
})

Then ('the user validate that item was added to cart', async () => {
    await sauceHelper.validateItemInCart('Sauce Labs Bolt T-Shirt')
})

When ('the user sort the items by name in the products page', async () => {
    await sauceHelper.sortItemsBy('za')
})

Then ('the user validate that items are sorted as expected', async () => {
    await sauceHelper.validateSortedItemsByName('desc')
})