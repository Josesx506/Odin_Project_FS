/* SELECT names */
-- 9. Lesotho and Moldova both have two o characters separated by two other characters. Find the countries that have 
-- two "o" characters separated by two others.
SELECT name FROM world WHERE name LIKE '%o__o%'


-- 10. Cuba and Togo have four characters names. Find the countries that have exactly four characters.
SELECT name FROM world WHERE length(name)=4


-- 11. The capital of Luxembourg is Luxembourg. Show all the countries where the capital is the same as the name 
-- of the country. Find the country where the name is the capital city.
SELECT name FROM world
    WHERE name = world.capital


-- 12. The capital of Mexico is Mexico City. Show all the countries where the capital has the country together with 
-- the word "City". Find the country where the capital is the country plus "City". The concat function
SELECT name FROM world
    WHERE capital LIKE concat(name, ' City')


-- 13. Find the capital and the name where the capital includes the name of the country.
SELECT capital, name FROM world
    WHERE capital LIKE concat('%', name,'%')


-- 14. Find the capital and the name where the capital is an extension of name of the country. You should include 
-- Mexico City as it is longer than Mexico. You should not include Luxembourg as the capital is the same as the country.
SELECT capital, name FROM world
    WHERE capital LIKE concat('%', name,'%') AND capital != name


-- 15. The capital of Monaco is Monaco-Ville: this is the name Monaco and the extension is -Ville. Show the name and 
-- the extension where the capital is a proper (non-empty) extension of name of the country. You can use the SQL 
-- function REPLACE.
SELECT name , REPLACE(capital,name,'' ) AS extension
    FROM world
    WHERE capital LIKE concat(name,'%') AND capital != name 


/* SELECT noble */
-- 12. Find all details of the prize won by EUGENE O'NEILL Escaping single quotes. You can't put a single quote in a 
-- quote string directly. You can use two single quotes within a quoted string.
SELECT yr, subject, winner FROM nobel
    WHERE winner LIKE 'EUGENE O_NEILL'


-- 13. Knights in order. List the winners, year and subject where the winner starts with Sir. Show the the most recent
--  first, then by name order.
SELECT winner, yr, subject FROM nobel
    WHERE winner LIKE 'SIR%' ORDER BY yr DESC, winner


-- 14. The expression subject IN ('chemistry','physics') can be used as a value - it will be 0 or 1. Show the 1984 
-- winners and subject ordered by subject and winner name; but list chemistry and physics last.
SELECT winner, subject
  FROM nobel
 WHERE yr=1984
 ORDER BY subject IN ('physics','chemistry'),subject,winner


/* SELECT within SELECT */
-- 4. Which country has a population that is more than United Kingdom but less than Germany? Show the name and the population.
SELECT name, population FROM world 
    WHERE 
        population > (SELECT population FROM world WHERE name='United Kingdom') AND 
        population < (SELECT population FROM world WHERE name='Germany')


-- 5. Germany (population roughly 80 million) has the largest population of the countries in Europe. Austria (population 8.5 
-- million) has 11% of the population of Germany. Show the name and the population of each country in Europe. Show the 
-- population as a percentage of the population of Germany. The format should be Name, Percentage for example:

-- name	percentage
-- Albania	3%
-- Andorra	0%
-- Austria	11%
-- ...	...

-- Decimal places
-- Percent symbol %
SELECT name, 
    concat(ROUND(100 * population/(SELECT population FROM world where name='Germany')),'%') 
FROM world
WHERE continent='Europe'


-- 6. Which countries have a GDP greater than every country in Europe? [Give the name only.] (Some countries may have NULL 
-- gdp values)
SELECT name FROM world
WHERE gdp > ALL(SELECT gdp FROM world WHERE gdp>0 AND continent='Europe')


-- 7. Find the largest country (by area) in each continent, show the continent, the name and the area: The above example 
-- is known as a correlated or synchronized sub-query. Using correlated subqueries
SELECT continent, name, area FROM world x
  WHERE area >= ALL(
    SELECT area FROM world y 
    WHERE y.continent=x.continent AND area >0
    )


-- 8. List each continent and the name of the country that comes first alphabetically.
SELECT continent, name FROM world x
WHERE name = (
    SELECT name FROM world y 
    WHERE y.continent=x.continent ORDER BY name LIMIT 1
    )
ORDER BY continent, name


-- 9. Find the continents where all countries have a population <= 25000000. Then find the names of the countries associated 
-- with these continents. Show name, continent and population.
SELECT name, continent, population FROM world
WHERE continent IN (
    SELECT continent FROM world
    GROUP BY continent
    HAVING MAX(population) <= 25000000
);

-- 10. Some countries have populations more than three times that of all of their neighbours (in the same continent). Give the 
-- countries and continents.
SELECT name, continent FROM world w1
WHERE population > ALL(
    SELECT population*3 FROM world w2 
    WHERE w1.continent = w2.continent AND w1.name <> w2.name
)