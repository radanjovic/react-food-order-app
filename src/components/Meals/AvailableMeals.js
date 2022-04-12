import React, {useEffect, useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import styles from './AvailableMeals.module.css';

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Using useEffect we make sure that this function only runs when first initialized (since there are no dependencies). //
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(process.env.FIREBASE);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const k in data) {
        loadedMeals.push({
          id: k,
          name: data[k].name,
          description: data[k].description,
          price: data[k].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    // Calling fetchMeals here to execute (since it's a promise-based function, 
    // try/catch won't work here, but we can wrap it like this bellow!):
    fetchMeals().catch( err => {
      setIsLoading(false);
      setError(err.message || 'Something went wrong');
    });

  }, []);

  if (isLoading) {
    return <section className={styles.mealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (error) {
    return <section className={styles.mealsError}>
      <p>{error}</p>
    </section>
  }

    const fetchedMeals = meals.map( meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {fetchedMeals}
                </ul>
            </Card>
        </section>
    )
}