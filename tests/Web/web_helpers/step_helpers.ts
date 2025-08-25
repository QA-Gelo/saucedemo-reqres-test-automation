import assert from 'assert';

export class SauceDemoStepHelpers {
  private I: CodeceptJS.I;

  constructor(I: CodeceptJS.I) {
    this.I = I;
  }

  async addItemsToCart(itemIds: string[]) {
    for (const id of itemIds) {
        this.I.click(`[id="add-to-cart-${id}"]`);
        this.I.seeElement(`[id="remove-${id}"]`);
    }
  }

  async clickItemToView(itemName: string) {
    const itemSelector = `.inventory_item_name`;
    this.I.say(`Clicking on item: ${itemName}`);
    this.I.waitForElement(itemSelector, 5);
    this.I.seeElement(itemSelector);
    this.I.click(locate(itemSelector).withText(itemName));
  }

  async validateItemInCart(itemName: string) {
    const cartItemSelector = '.cart_item .inventory_item_name';
    this.I.say(`Validating that "${itemName}" is present in the cart...`);

    this.I.waitForElement(cartItemSelector, 5);
    const cartItems = await this.I.grabTextFromAll(cartItemSelector);

    this.I.say(`Items currently in cart: ${cartItems.join(', ')}`);
    assert(cartItems.includes(itemName), `Item "${itemName}" was not found in the cart`);
  }

  async addItemToCartViaItemDetailsPage() {
    const addToCartButton = 'button[id^="add-to-cart"]';
    this.I.say('Clicking Add to Cart button on item details page');
    this.I.waitForElement(addToCartButton, 5);
    this.I.seeElement(addToCartButton);
    this.I.click(addToCartButton);
  }

  async goToCart () {
    this.I.click('[id=shopping_cart_container]');
  }

  async removeItemByName(itemName: string) {
    const itemXPath = `//div[@class='cart_item'][.//div[contains(@class, 'inventory_item_name') and contains(text(), "${itemName}")]]`;
    const buttonXPath = `${itemXPath}//button[contains(text(), 'Remove')]`;

    this.I.say(`Removing item: ${itemName}`);
    this.I.seeElement(itemXPath);
    this.I.click(buttonXPath);
    this.I.dontSeeElement(buttonXPath);
  }


  async sortItemsAtoZ() {
    this.I.say('Sorting items A to Z...');
    this.I.selectOption('.product_sort_container', 'az');
    this.I.waitForVisible('.inventory_item', 5);

    const itemNameSelector = '.inventory_item_name';
    const itemNames = await this.I.grabTextFromAll(itemNameSelector);

    this.I.say(`Item names after sorting: ${itemNames.join(', ')}`);

    const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));
    this.I.say(`Expected sorted order: ${sortedNames.join(', ')}`);

    assert.deepStrictEqual(itemNames, sortedNames, 'Items are not sorted A to Z');
  }

  async sortItemsBy(type: 'az' | 'za' | 'lohi' | 'hilo') {
    const sortLabels: Record<string, string> = {
        az: 'Name (A to Z)',
        za: 'Name (Z to A)',
        lohi: 'Price (low to high)',
        hilo: 'Price (high to low)',
    };

    this.I.say(`Sorting items by ${sortLabels[type]}...`);
    this.I.selectOption('.product_sort_container', type);
    this.I.waitForVisible('.inventory_item', 5);
  }

  async validateSortedItemsByName(order: 'asc' | 'desc') {
    const itemNames = await this.I.grabTextFromAll('.inventory_item_name');
    this.I.say(`Item names on page: ${itemNames.join(', ')}`);

    const expectedOrder = [...itemNames].sort((a, b) =>
        order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );

    this.I.say(`Expected ${order === 'asc' ? 'A to Z' : 'Z to A'} order: ${expectedOrder.join(', ')}`);
    assert.deepStrictEqual(itemNames, expectedOrder, `Items are not sorted ${order === 'asc' ? 'A to Z' : 'Z to A'}`);
  }

  async validateSortedItemsByPrice(order: 'asc' | 'desc') {
    const priceSelector = '.inventory_item_price';
    const pricesText = await this.I.grabTextFromAll(priceSelector);
    const prices = pricesText.map(p => parseFloat(p.replace('$', '')));

    this.I.say(`Prices on page: ${prices.join(', ')}`);

    const expectedOrder = [...prices].sort((a, b) =>
        order === 'asc' ? a - b : b - a
    );

    this.I.say(`Expected ${order === 'asc' ? 'Low to High' : 'High to Low'} order: ${expectedOrder.join(', ')}`);
    assert.deepStrictEqual(prices, expectedOrder, `Items are not sorted by price ${order === 'asc' ? 'Low to High' : 'High to Low'}`);
  }

  async navigateToCheckoutOverview() {
    this.I.click('[id=checkout]');
    this.I.see('Checkout: Your Information');
  }

  async fillOutYourInfomationDetails() {
    this.I.fillField('[id=first-name]', 'msgJane');
    this.I.fillField('[id=last-name]', 'autoEngr');
    this.I.fillField('[id=postal-code]', '1227');
    this.I.click('[id=continue]');
  }

  async validateCheckoutOverviewPage() {
    this.I.see('Checkout: Overview');
  }

  async validateItemsInCheckoutOverview(expectedItemNames: string[]) {
    this.I.say('Validating items in Checkout: Overview page...');
    await this.I.waitForVisible('.cart_item', 5);
    const actualItemNames = await this.I.grabTextFromAll('.cart_item .inventory_item_name');
    this.I.say(`Actual items in checkout: ${actualItemNames.join(', ')}`);
    const sortedActual = [...actualItemNames].sort();
    const sortedExpected = [...expectedItemNames].sort();
    assert.deepStrictEqual(sortedActual, sortedExpected, 'Mismatch in checkout overview items');
  }

  async finishPurchaseOfItems() {
    this.I.click('[id=finish]');
  }

  async validateSuccessfulOrder() {
    this.I.see('Thank you for your order!');
    this.I.see('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }

}