
import { NextResponse } from "next/server";
import * as dotenv from 'dotenv';
dotenv.config();
import Groq from "groq-sdk"

export async function POST(request) {
  try {
    const body = await request.json(); // Parse JSON body
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const ingredients = body;

 
    if(ingredients.length == 0){
        
        return NextResponse.json({message :"Ingredients"}, { status: 400 });
    }


  else{
  async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Suggest a recipe using some or all of these ingredients: ${ingredients.join(', ')}. Provide the recipe name, ingredients list, and step-by-step instructions.`,
      },
    ],
    //"llama3-8b-8192"
    model: "llama3-8b-8192",
  });
}
const chatCompletion = await getGroqChatCompletion();
// Print the completion returned by the LLM.
//console.log(chatCompletion.choices[0]?.message?.content || "");
 const body1 = chatCompletion.choices[0]?.message?.content || ""
const body2 = parseRecipeContent(body1)

    // Respond with a success message
    return NextResponse.json({data:body2});
}
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
 
}
function parseRecipeContent(content) {
    // Initialize empty object for recipe
    const recipe = {
      recipe_name: "",
      ingredients: [],
      instructions: []
    };
  
    // Split the content into lines
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
    // Log the lines for debugging
    console.log("Lines after splitting content:", lines);
  
    // Extract recipe name
    if (lines.length > 0) {
      recipe.recipe_name = lines[1].replace('Recipe Name:', '').trim();
    }
  
    // Find index of "Ingredients:" and "Instructions:"
    const ingredientsIndex = lines.indexOf('**Ingredients:**');
    const instructionsIndex = lines.indexOf('**Instructions:**');
    
    
  
    // Extract ingredients
    if (ingredientsIndex > -1 && instructionsIndex > ingredientsIndex) {
      recipe.ingredients = lines.slice(ingredientsIndex + 1, instructionsIndex).map(line => line.trim());
    }
    console.log("Lines after splitting content:", recipe.ingredients);
    // Extract instructions
    if (instructionsIndex > -1) {
      recipe.instructions = lines.slice(instructionsIndex + 1).map(line => line.trim());
    }
  
    return recipe;
  }

