import mealsData from './data/meals.json';
import PubSub from 'pubsub-js';

let loadMenuCss = false;

const cart = (function () {
    const element = document.createElement("div");
    element.classList.add("sticky-cart-total");

    const checkOut = document.createElement("button");
    checkOut.classList.add("check-out");
    checkOut.textContent = "Checkout";

    const orders = document.createElement("div");
    orders.classList.add("cart-div");
    orders.innerHTML = `<span><i class="fa-solid fa-cart-shopping"></i> Total: $</span>`;
    const total = document.createElement("span");
    total.classList.add("cart-total");
    total.textContent = "0";
    orders.appendChild(total);

    element.appendChild(orders);
    element.appendChild(checkOut);
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
    element.classList.add("menu-items");

    // Using a json file for temp storage
    const myMeals = mealsData.map(meal => new Item(meal.title, meal.desc, meal.link, meal.price, meal.volume));

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
            PubSub.publish("MEAL_ITEM_UPDATED", myMeals);
        });

        itemDecr.addEventListener("click", (e) => {
            item.decrementVolume();
            itemVolume.textContent = item.volume;
            PubSub.publish("MEAL_ITEM_UPDATED", myMeals);
        });

        element.appendChild(itemCntr);
    });

    return {
        element: element,
        getMeals: () => myMeals
    };
}) ();

const drinkCntr = (function () {
    const element = document.createElement("div");
    element.classList.add("menu-items");

    const myDrinks = [new Item("Champagne","Bottle","https://static.vecteezy.com/system/resources/thumbnails/033/874/472/small_2x/ai-generative-champagne-popping-and-pouring-with-blurred-bokeh-background-photo.jpg",120,0),
                      new Item("Spirits and Vodka","Bottle","https://media.istockphoto.com/id/545346590/photo/bottle-of-absolut-vodka.jpg?s=612x612&w=0&k=20&c=EYvQpzyQUpaMrvV57eTYuE3afWED2_ZwKbMS1I0_o8E=",40,0),
                      new Item("Red Wine","Bottle","https://images.pexels.com/photos/374073/pexels-photo-374073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",45,0),
                      new Item("White Wine","Glass","https://images.pexels.com/photos/2115740/pexels-photo-2115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",12,0),
                      new Item("Tap Beer","Glass","https://images.pexels.com/photos/691492/proost-beer-bar-cafe-691492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",8,0),
                      new Item("Magarita","Glass","https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",14,0),];
    
    myDrinks.forEach((item,idx)=> {
        const itemCntr = document.createElement("div");
        itemCntr.classList.add("item-card", "drink", idx);

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
            PubSub.publish("MEAL_ITEM_UPDATED", myDrinks);
        });

        itemDecr.addEventListener("click", (e) => {
            item.decrementVolume();
            itemVolume.textContent = item.volume;
            PubSub.publish("MEAL_ITEM_UPDATED", myDrinks);
        });

        element.appendChild(itemCntr);
    });

    return {
        element: element,
        getDrinks: () => myDrinks
    };
}) ();

function calculateCartTotal(meals) {
    return meals.reduce((total, item) => total + item.price * item.volume, 0);
}

function updateCartTotal() {
    const myMeals = mealCntr.getMeals();
    const totalMeal = calculateCartTotal(myMeals);
    const myDrinks = drinkCntr.getDrinks();
    const totalDrink = calculateCartTotal(myDrinks);
    let total = totalMeal + totalDrink;
    document.querySelector(".cart-total").textContent = total;
}

export default function menuPage(){
    loadMenuCss = true;
    if (loadMenuCss) {
        import("./css/menu.css");
    }
    
    const element = document.createElement("div");
    element.classList.add("menu-page-content");

    const mealTitle = document.createElement("div");
    mealTitle.classList.add("mid-titles", "meals");
    mealTitle.textContent = "Meals";

    const drinkTitle = document.createElement("div");
    drinkTitle.classList.add("mid-titles", "drinks");
    drinkTitle.textContent = "Drinks";

    PubSub.subscribe("MEAL_ITEM_UPDATED", updateCartTotal);

    element.appendChild(cart)
    element.appendChild(mealTitle)
    element.appendChild(mealCntr.element)
    element.appendChild(drinkTitle)
    element.appendChild(drinkCntr.element)
    
    return element;
};