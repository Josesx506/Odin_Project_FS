import mealsData from './data/meals.json';
import PubSub from 'pubsub-js';

let loadMenuCss = false;

const cart = (function () {
    const element = document.createElement("div");
    element.classList.add("cart-div");
    element.innerHTML = `<span><i class="fa-solid fa-cart-shopping"></i> Total: $</span>`;
    const total = document.createElement("span");
    total.classList.add("cart-total");
    total.textContent = "0";
    element.appendChild(total);
    return element
}) ()

class Item {
    constructor (title,ingredients,link,price,volume) {
        this.title = title;
        this.ingredients = ingredients;
        this.link = link;
        this.price = price;
        this.volume = volume;
    }
    
    incrementVolume() {
        this.volume++;
    };

    decrementVolume() {
        if (this.volume > 0) {
            this.volume--;
        } else {
            this.volume = 0;
        }
    };

    calculateItemTotal() {
        let total = this.price * this.volume;
        return total;
    };
};

const mealCntr = (function () {
    const element = document.createElement("div");
    element.classList.add("meal-items");

    const myMeals = [new Item("Smash Burger","Beef, Onions, Patties","https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",10,0),
                     new Item("Pancakes","Flour, Milk","https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",15,0),
                     new Item("Shrimp Pasta","Shrimp, Pasta","https://images.pexels.com/photos/8969080/pexels-photo-8969080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",18,0),
                     new Item("Alfredo Pasta","Pasta, Cream, Parseley","https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",20,0),
                     new Item("Steak","Steak, Carrots","https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",30,0),];

    // const myMeals = mealsData.map(meal => new Item(meal.title, meal.desc, meal.link, meal.price, meal.volume));

    myMeals.forEach((item,idx)=> {
        const itemCntr = document.createElement("div");
        itemCntr.classList.add("item-card", "meal", idx);

        const itemTitle = document.createElement("div");
        itemTitle.classList.add("card-item-title");
        itemTitle.textContent = item.title;

        const itemImg = document.createElement("img");
        itemImg.classList.add("card-item-image");
        itemImg.src = item.link;

        const itemIngredients = document.createElement("div");
        itemIngredients.classList.add("card-item-ingredients");
        itemIngredients.textContent = item.ingredients;

        const itemStatus = document.createElement("div");
        itemStatus.classList.add("card-item-row4");
        const itemPrice = document.createElement("div");
        itemPrice.textContent = `$${item.price}`;
        const itemVolume = document.createElement("div");
        itemVolume.textContent = item.volume;
        itemStatus.appendChild(itemPrice);
        itemStatus.appendChild(itemVolume);

        const itemChange = document.createElement("div");
        itemChange.classList.add("card-item-row5");
        const itemDecr = document.createElement("button");
        itemDecr.textContent = "-";
        const itemIncr = document.createElement("button");
        itemIncr.textContent = "+";
        itemChange.appendChild(itemDecr);
        itemChange.appendChild(itemIncr);

        itemCntr.appendChild(itemTitle);
        itemCntr.appendChild(itemImg);
        itemCntr.appendChild(itemIngredients);
        itemCntr.appendChild(itemStatus);
        itemCntr.appendChild(itemChange);

        // Add event listeners to the buttons
        itemIncr.addEventListener("click", () => {
            item.incrementVolume();
            itemVolume.textContent = item.volume;
            PubSub.publish('ITEM_UPDATED', myMeals);
        });

        itemDecr.addEventListener("click", (e) => {
            item.decrementVolume();
            itemVolume.textContent = item.volume;
            PubSub.publish('ITEM_UPDATED', myMeals);
        });

        element.appendChild(itemCntr);
    });

    return {
        element: element,
        getMeals: () => myMeals
    };
}) ();

function calculateCartTotal(meals) {
    return meals.reduce((total, item) => total + item.price * item.volume, 0);
}

function updateCartTotal() {
    const myMeals = mealCntr.getMeals();
    const total = calculateCartTotal(myMeals);
    document.querySelector(".cart-total").textContent = total;
}

export default function menuPage(){
    loadMenuCss = true;
    if (loadMenuCss) {
        import("./css/menu.css");
    }
    
    const element = document.createElement("div");
    element.classList.add("menu-page-content");
    console.log("This is the menu page");

    const mealTitle = document.createElement("div");
    mealTitle.classList.add("mid-titles", "meals");
    mealTitle.textContent = "Meals";

    const drinkTitle = document.createElement("div");
    drinkTitle.classList.add("mid-titles", "drinks");
    drinkTitle.textContent = "Drinks";

    PubSub.subscribe('ITEM_UPDATED', updateCartTotal);

    element.appendChild(cart)
    element.appendChild(mealTitle)
    element.appendChild(mealCntr.element)
    element.appendChild(drinkTitle)
    
    return element;
};