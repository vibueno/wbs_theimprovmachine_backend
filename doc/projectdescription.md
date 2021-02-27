# The Improv Machine - Description

## Table of Contents

- [Description](#description)
- [Modules](#modules)
- [Bibliography](#bibliography)

## Description

_The Improv Machine_ is an Improv (improvisational theatre) suggestions generator that can be used by improv actors to get scenes started.

**Improv:** Improvisation, or improv, is a form of live theatre in which the plot, characters and dialogue of a game, scene or story are made up in the moment. Often improvisers will take a suggestion from the audience, or draw on some other source of inspiration to get started.

_The Improv Machine_ is aimed at taking over the role of the audience by generating different types of suggestions that will be used to get inspiration for creating improvised scenes.

While its aim for now is to help improvisers during their trainings, it could also be used in live performances.

## Modules

_The Improv Machine_ is built in a very modular way, so that once the basic structure is completed, adding a new type of suggestion is not very complicated.

This way, I can also ensure that, in case I run out of time, I can just leave features out, without affecting the project in a dramatic way.

### What is Improv and brief history

A static page with some introductory text about what is improv and a brief history of this theatrical art.

### Suggestions

The main body of the project will be the suggestions generator.

**Relationship:** the software offers the user a suggestion of a relationship between characters (father-son, teacher-pupil...)

**Place:** where the scene will take place (a bar, a cemetery, on a cloud...)

**Object:** some scenes start or are enhanced through suggestions in the form of objects. I have found a picture database of almost 2000 objects, which I am allowed to use: [THINGS](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223792).

**Body posture:** other scenes start with body postures of the actors. I have been looking for a database of pictures of human postures, but I haven't found anything good enough, so I will be taking the pictures myself.

**Keywords:** just one or more words which will be used to inspire the scene

**Sentence:** a sentence can be used in different ways: it can be the title of the scene, the starting sentence, the final sentence...

**Book paragraph:** based on a excerpt of a book, the actors create a new scene.

**Languages:** the scene will be played in the language proposed by the software.

In order to get all this information, I will be consulting different API's, databases and picture collections.

All these types of suggestions will be then combined by the user to generate new improv games. Depending on the game, the software may give all the suggestions before the game starts and, in some cases, also during the performance.

## Bibliography

- [The hideout - What is Improv](https://www.hideouttheatre.com/about/what-is-improv/)
