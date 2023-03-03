import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './availableMeals.module.css'


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const fetchMeals = async () => {
        setHttpError(null);
        setIsLoading(true);
        try {
            const response = await fetch('https://react-meals-49df2-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

            console.log(response.status);
            if (response.status === 404) {
                throw new Error('Page not found');
            }

            const data = await response.json();
            let loadedData = [];
            for (const key in data) {
                loadedData.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                })
            }
            setMeals(loadedData);
        }
        catch (e) {
            setHttpError(e.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchMeals();
    }, [])

    const mealItems = meals.map(meal => <MealItem meal={meal} key={meal.id} />)
    console.log(mealItems)
    return (
        <>
            {isLoading && <section className={classes.mealsLoading}>Loading...</section>}
            {httpError && <section className={classes.mealsError}>{httpError}</section>}
            <section className={classes.meals} >
                <Card>
                    <ul>{mealItems}</ul>
                </Card>
            </section>
        </>
    )
}

export default AvailableMeals