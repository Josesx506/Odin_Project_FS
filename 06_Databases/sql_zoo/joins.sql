-- 8. The example query shows all goals scored in the Germany-Greece quarterfinal. Instead show the name of all players who 
-- scored a goal against Germany. HINT
SELECT DISTINCT player
  FROM game JOIN goal ON matchid = id 
    WHERE (team1='GER' OR team2='GER') AND teamid!='GER'


-- 9. Show teamname and the total number of goals scored. COUNT and GROUP BY
SELECT teamname, COUNT(player)
  FROM eteam JOIN goal ON id=teamid
  GROUP BY teamname
  ORDER BY teamname


-- 10. Show the stadium and the number of goals scored in each stadium.
SELECT stadium, COUNT(player)
  FROM game JOIN goal ON id=matchid
  GROUP BY stadium
  ORDER BY stadium


-- 11. For every match involving 'POL', show the matchid, date and the number of goals scored.
SELECT matchid,mdate,COUNT(player)
  FROM game JOIN goal ON matchid = id 
  WHERE (team1 = 'POL' OR team2 = 'POL')
  GROUP BY matchid


-- 12. For every match where 'GER' scored, show matchid, match date and the number of goals scored by 'GER'
SELECT matchid,mdate,COUNT(player)
  FROM game JOIN goal ON matchid = id 
  WHERE (team1 = 'GER' OR team2 = 'GER') AND teamid='GER'
  GROUP BY matchid


-- 13. List every match with the goals scored by each team as shown. This will use "CASE WHEN" which has not been 
-- explained in any previous exercises.
-- mdate	team1	score1	team2	score2
-- 1 July 2012	ESP	4	ITA	0
-- 10 June 2012	ESP	1	ITA	1
-- 10 June 2012	IRL	1	CRO	3
-- ...
-- Notice in the query given every goal is listed. If it was a team1 goal then a 1 appears in score1, otherwise 
-- there is a 0. You could SUM this column to get a count of the goals scored by team1. Sort your result by mdate, matchid, team1 and team2.

SELECT mdate,
  team1,
  SUM(CASE WHEN teamid=team1 THEN 1 ELSE 0 END) score1,
  team2,
  SUM(CASE WHEN teamid=team2 THEN 1 ELSE 0 END) score2
  FROM game LEFT JOIN goal ON matchid = id
  GROUP BY matchid,mdate
  ORDER BY mdate, matchid,team1,team2


/* ADVANCED JOINS */
-- Cast list for Casablanca
-- 6. Obtain the cast list for 'Casablanca'. Use movieid=11768, (or whatever value you got from the previous question)
SELECT name FROM actor AS a
JOIN casting AS c ON a.id = c.actorid
JOIN movie as m ON c.movieid = m.id
WHERE m.id = (SELECT id FROM movie where title='Casablanca')

-- 8. List the films in which 'Harrison Ford' has appeared
SELECT title FROM movie as m
JOIN casting AS c ON m.id = c.movieid
JOIN actor AS a ON a.id = c.actorid 
WHERE a.name = 'Harrison Ford'


-- 9. List the films where 'Harrison Ford' has appeared - but not in the starring role. [Note: the ord field of casting gives the position of the 
-- actor. If ord=1 then this actor is in the starring role]
SELECT title FROM movie as m
JOIN casting AS c ON m.id = c.movieid
JOIN actor AS a ON a.id = c.actorid 
WHERE a.name = 'Harrison Ford' AND c.ord!=1


-- 10. List the films together with the leading star for all 1962 films.
SELECT m.title,a.name FROM movie as m
JOIN casting AS c ON m.id = c.movieid
JOIN actor AS a ON a.id = c.actorid 
WHERE c.ord=1 AND m.yr=1962


-- 11. Which were the busiest years for 'Rock Hudson', show the year and the number of movies he made each year for any year in which he made more than 2 movies.
SELECT yr,COUNT(title) FROM
  movie JOIN casting ON movie.id=movieid
        JOIN actor   ON actorid=actor.id
WHERE name='Rock Hudson'
GROUP BY yr
HAVING COUNT(title) > 2


-- 12. List the film title and the leading actor for all of the films 'Julie Andrews' played in. Did you get "Little Miss Marker twice"?
SELECT DISTINCT m.title, a.name 
FROM movie AS m
JOIN casting AS c ON m.id = c.movieid 
JOIN actor AS a ON c.actorid = a.id
WHERE c.ord = 1 
AND c.movieid IN (
    SELECT c.movieid 
    FROM casting c
    JOIN actor a ON c.actorid = a.id
    WHERE a.name = 'Julie Andrews'
);


-- 13. Obtain a list, in alphabetical order, of actors who've had at least 15 starring roles.
SELECT a.name FROM actor AS a
JOIN casting AS c ON a.id = c.actorid
JOIN movie AS m ON c.movieid = m.id 
WHERE c.ord=1
GROUP BY a.name 
HAVING COUNT(m.title)>=15
ORDER BY a.name 


-- 14. List the films released in the year 1978 ordered by the number of actors in the cast, then by title.
SELECT m.title,COUNT(a.name) FROM movie as m
JOIN casting AS c ON m.id = c.movieid
JOIN actor as a ON c.actorid = a.id
WHERE m.yr = 1978
GROUP BY m.title
ORDER BY COUNT(a.name) DESC, title


-- 15. List all the people who have worked with 'Art Garfunkel'.
SELECT DISTINCT a.name FROM actor as a 
JOIN casting AS c ON a.id = c.actorid
WHERE c.movieid IN (
  SELECT movieid FROM casting 
  JOIN actor ON casting.actorid=actor.id
  WHERE actor.name = 'Art Garfunkel') 
AND a.name!='Art Garfunkel'