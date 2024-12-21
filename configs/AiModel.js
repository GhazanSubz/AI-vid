const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContextText as field."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scenes\": [\n    {\n      \"imagePrompt\": \"A bustling marketplace in ancient Alexandria, Egypt. The sun is setting, casting long shadows across the stalls filled with exotic spices, pottery, and textiles. People in traditional Egyptian clothing are bartering and interacting. Realistic, 8K, detailed, vibrant colors, warm lighting.\",\n      \"contextText\": \"Our story begins in ancient Alexandria, a vibrant hub of trade and knowledge.\"\n    },\n    {\n        \"imagePrompt\": \"A young woman, Hypatia, with intelligent eyes and a scroll in her hand, stands in the Library of Alexandria.  She is surrounded by towering bookshelves filled with ancient texts.  Sunlight streams through a high window, illuminating the dust motes in the air. Realistic, 8K, detailed, scholarly, focused expression, natural lighting.\",\n      \"contextText\": \"Here lived Hypatia, a brilliant mathematician and philosopher.\"\n    },\n     {\n        \"imagePrompt\": \"Hypatia lecturing a small group of students in a courtyard. She is gesturing with her hands, explaining a complex mathematical equation inscribed on a stone tablet. The students are attentive, their faces reflecting curiosity and respect. Realistic, 8K, detailed, scholarly attire, sunny day, ancient architecture.\",\n        \"contextText\": \"She was renowned for her intellect and taught both philosophy and mathematics.\"\n\n     },\n     {\n        \"imagePrompt\": \"A dramatic close up of Hypatia's hands drawing geometric shapes in the sand. The sunlight casts long shadows of her hands against the fine sand. A look of intense concentration on her face. Realistic, detailed, focused, dramatic lighting, shallow depth of field.\",\n       \"contextText\": \"Her discoveries advanced the understanding of geometry and astronomy.\"\n    },\n    {\n      \"imagePrompt\": \"A crowd of people in ancient Alexandria are shouting and gathering, their faces filled with anger and fanaticism.  A chaotic scene with torches and raised fists. Dark shadows and dramatic lighting. Realistic, 8K, detailed, violent, agitated expressions.\",\n      \"contextText\":\"But these were times of great unrest, fueled by religious conflict.\"\n    },\n     {\n       \"imagePrompt\": \"Hypatia being dragged through the streets of Alexandria by a mob. Her expression is one of sorrow but also unwavering dignity. Her books and scrolls are scattered on the ground.  Tragic scene, Realistic, 8K, detailed, somber, dusty streets, broken objects.\",\n       \"contextText\": \"Tragically, Hypatia became a target of this violence.\"\n     },\n    {\n      \"imagePrompt\": \"A solitary stone monument with an inscription in ancient Greek, honoring Hypatia. The stone stands silently against a beautiful sunset sky. Soft lighting, peaceful, a feeling of respect and remembrance. Realistic, 8K, detailed, serene, long shadows.\",\n       \"contextText\":\"Her life was cut short, but her legacy lives on as a symbol of wisdom and courage. \"\n    },\n    {\n        \"imagePrompt\": \"A star filled night sky over Alexandria with constellations visible.The stars are shining brightly. Realistic, 8K, detailed, expansive, dark sky, ethereal.\",\n        \"contextText\": \"Remembering Hypatia, a light that shone brightly in the ancient world\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
 