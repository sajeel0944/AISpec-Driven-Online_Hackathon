import os
from agents import GuardrailFunctionOutput, RunContextWrapper, Runner, Agent, OpenAIChatCompletionsModel, AsyncOpenAI, TResponseInputItem, input_guardrail, set_tracing_disabled
from dotenv import load_dotenv
from pydantic import BaseModel

#----------------------------------------------------------------

load_dotenv()
set_tracing_disabled(disabled=True)

#----------------------------------------------------------------

GEMINI_API_KEY : str = os.getenv("GEMINI_API_KEY")
MODEL : str = "gemini-2.5-flash"

#----------------------------------------------------------------

external_client = AsyncOpenAI(
    api_key = GEMINI_API_KEY,
    base_url = "https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model = MODEL,
    openai_client = external_client 
)

#-------------------------Agent out schema---------------------------------------

class Is_book_Query(BaseModel):
    is_book_related : bool 
    query_topic : str 

#------------------------Agent----------------------------------------

book_classifier_agent = Agent(
    name="book classifier agent",
    instructions="""
    You are a topic-specific book classifier.

    The assistant is ONLY for a book titled:
    "Physical AI & Humanoid Robotics"

    Your job is to decide whether a user's query is related to this book OR is a basic greeting.

    Set:
    - is_book_related = true → ONLY if the query matches allowed categories
    - is_book_related = false → for everything else

    ALLOW (is_book_related = true):

    1. Queries related to the book topic:
       - Physical AI
       - Humanoid Robotics
       - Embodied AI
       - Robotics perception, motion, control
       - Human-like robots
       - AI in physical systems
       - Chapters, summaries, explanations from the book
       - Author, concept, examples related to this book

    2. Basic conversational messages:
       - hello, hi, hey
       - ok, okay, thanks, thank you
       - yes, no

    BLOCK (is_book_related = false):

    - Mathematics (e.g., 2+2, algebra)
    - Physics or chemistry (e.g., what is gas)
    - Health, medical, fitness, nutrition
    - General science not related to robotics
    - Programming questions not related to Physical AI
    - Technology topics unrelated to humanoid robots
    - Movies, sports, politics, business
    - Travel, cooking, daily life questions
    - Random or unrelated questions

    IMPORTANT RULE:
    If the query is NOT clearly about the book "Physical AI & Humanoid Robotics"
    or a basic greeting, then it MUST be marked as NOT book-related.
    """,
    output_type=Is_book_Query,
    model=model
)

#------------------------------input_guardrail----------------------------------

@input_guardrail
async def check_book_topic(ctx: RunContextWrapper[None], agent: Agent, input: str | list[TResponseInputItem]) -> GuardrailFunctionOutput:
    book_result = await Runner.run(
        book_classifier_agent,
        input,
    )

    non_book_detected = not book_result.final_output.is_book_related

    return GuardrailFunctionOutput(
        output_info=book_result.final_output,
        tripwire_triggered=non_book_detected
    )
