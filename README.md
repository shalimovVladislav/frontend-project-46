GenDiff
========================
GenDiff is a program that determines the difference between two data structures. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.
-------------------------
### Utility features:
* Support for different input formats: yaml, json
* Report generation in the form of plain text, stylish and json

### Reference Information:
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:<br />
-V, --version        output the version number<br />
-f, --format <type>  output format (choices: "stylish", "plain", "json", default: "stylish")<br />
 -h, --help           display help for command<br />

### Hexlet tests and linter status:
[![Actions Status](https://github.com/vladshal/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/vladshal/frontend-project-46/actions)
[![gendiff](https://github.com/vladshal/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/vladshal/frontend-project-46/actions/workflows/gendiff.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd1ac021ee49037ee202/maintainability)](https://codeclimate.com/github/vladshal/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bd1ac021ee49037ee202/test_coverage)](https://codeclimate.com/github/vladshal/frontend-project-46/test_coverage)

#### An example of how a package works with flat files in stylish format: 
* [json](https://asciinema.org/a/b3LKZ26SNLW0elIPjHhEn2viS)
* [yml](https://asciinema.org/a/ScCvtw0aIIPlnydatoDXsb16M)

#### An example of how a package works with nested files in stylish format: 
* [json](https://asciinema.org/a/S04BJfUgY3KN11n0rgWhe5IEx)
* [yml](https://asciinema.org/a/8wQ2byi0v3vLwsEUqQzY6JifF)

#### An example of how a package works with nested files in plain format: 
* [json](https://asciinema.org/a/max3c15JOm7qS17LC223FB0Ud)
* [yml](https://asciinema.org/a/a7aqw4rBb2PBGL912d1oGJB6n)

#### An example of how a package works with nested files in json format: 
* [json](https://asciinema.org/a/bu2oq8f2VyaqWWiTv9UscAOzr)
* [yml](https://asciinema.org/a/Lw8GfoTsQHl7Yeo2BuKjPAuce)
