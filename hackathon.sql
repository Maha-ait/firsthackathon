-- create database and switch to it
CREATE DATABASE IF NOT EXISTS hack1;
USE hack1;

-- drop tables if they already exist
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;

-- create ingredients table
CREATE TABLE ingredients (
    sno INT PRIMARY KEY,
    iname VARCHAR(100) NOT NULL UNIQUE
);

-- create recipes table
CREATE TABLE recipes (
    sno INT PRIMARY KEY,
    recipe_name VARCHAR(100),
    rname VARCHAR(100),
    CONSTRAINT fk_rname_ingredients FOREIGN KEY (rname) REFERENCES ingredients(iname)
);

-- change delimiter before creating procedures
DELIMITER //

-- Add procedures
DROP PROCEDURE IF EXISTS AddIngredient //
CREATE PROCEDURE AddIngredient(IN id INT, IN name VARCHAR(100))
BEGIN
    INSERT INTO ingredients (sno, iname) VALUES (id, name);
END //

DROP PROCEDURE IF EXISTS AddRecipe //
CREATE PROCEDURE AddRecipe(IN id INT, IN recipeName VARCHAR(100), IN ingredientName VARCHAR(100))
BEGIN
    INSERT INTO recipes (sno, recipe_name, rname) VALUES (id, recipeName, ingredientName);
END //

DROP PROCEDURE IF EXISTS DeleteIngredient //
CREATE PROCEDURE DeleteIngredient(IN id INT)
BEGIN
    DELETE FROM ingredients WHERE sno = id;
END //

DROP PROCEDURE IF EXISTS DeleteRecipe //
CREATE PROCEDURE DeleteRecipe(IN id INT)
BEGIN
    DELETE FROM recipes WHERE sno = id;
END //

DELIMITER //

-- Create UpdateIngredient only if it doesn't exist
IF NOT EXISTS (
DELIMITER //

CREATE PROCEDURE uupdateIngredient(IN id INT, IN newName VARCHAR(100))
BEGIN
    UPDATE ingredients
    SET iname = newName 
    WHERE sno = id;
END;
//

CREATE PROCEDURE uupdateRecipe(
    IN id INT, 
    IN newRecipeName VARCHAR(100), 
    IN newIngredientName VARCHAR(100)
)
BEGIN
    UPDATE recipes
    SET recipe_name = newRecipeName,
        rname = newIngredientName
    WHERE sno = id;
END;
//

DELIMITER ;




