# OpenAI Plugin Search

This is a simple web application for searching OpenAI plugins. It uses Node.js and Express.js for the backend and plain HTML/CSS/JavaScript for the frontend.

## Live demo

[Live demo](https://openaipluginsearch.onrender.com/)

## Setup

To run this project, you need to have Node.js installed. Follow these steps:

1. Clone this repository: `git clone https://github.com/yourusername/openai-plugin-search.git`
2. Navigate to the project directory: `cd openai-plugin-search`
3. Install the necessary dependencies: `npm install express axios cors dotenv`
4. Create a `.env` file in the root of your project and add your OpenAI token: `OPENAI_TOKEN=your_token_here`
5. Start the server: `node server.js`

The application will be running at `http://localhost:3000`.


## Usage

Enter your search query in the input field and click 'Search'. The results will be displayed below.

## Deployment

This application can be easily deployed on platforms like Vercel or Render. Simply create a new project on your chosen platform and link it to your GitHub repository. Remember to add your OpenAI token as an environment variable in your deployment platform.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
