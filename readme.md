NC_news
To run this project locally, you will need to set up the necessary environment variables.

Setting Up Environment Variables
The project requires two database connections: one for development, and one for testing. To set up the required environment variables, follow these steps:

Create a file named .env.development in the root directory of the project. Add the following environment variables to this file:

PGDATABASE=nc_news;

Create a file named .env.test in the root directory of the project. Add the following environment variables to this file:

PGDATABASE=nc_news_test;

Note that .env.* files are added to the .gitignore file and will not be included in the repository. Therefore, anyone who clones the repository will need to create their own .env.* files with the appropriate environment variables.


To run the project, follow these steps:

Install the dependencies by running npm install.



