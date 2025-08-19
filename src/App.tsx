import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
} from "@mui/material";
import Footer from "./components/footer";
import ReviewPage from "./components/review_page/ReviewPage";


type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

// Original quiz questions (unshuffled)
const questionBank: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctIndex: 0,
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
    correctIndex: 1,
    explanation: "Leonardo da Vinci painted the Mona Lisa in the early 1500s.",
  },
  {
    question: "What is the largest planet in the solar system?",
    options: ["Mars", "Earth", "Jupiter", "Saturn"],
    correctIndex: 2,
    explanation: "Jupiter is the largest planet, with a diameter of 139,820 km.",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
    correctIndex: 0,
    explanation: "'O' stands for Oxygen, essential for life on Earth.",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Lion", "Horse", "Greyhound"],
    correctIndex: 0,
    explanation: "Cheetahs can sprint up to 70 mph, making them the fastest land animals.",
  },
];

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);


  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);

  // On mount, shuffle questions and also shuffle each question's options
  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionBank).map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      const correctIndex = shuffledOptions.indexOf(q.options[q.correctIndex]);
      return { ...q, options: shuffledOptions, correctIndex };
    });
    setQuestions(shuffledQuestions);
  }, []);

const handleNext = () => {
  if (selected !== null) {
    // Save answer
    setUserAnswers((prev) => [...prev, selected]);

    // Update score
    if (questions[currentQuestion].options[questions[currentQuestion].correctIndex] === selected) {
      setScore((prev) => prev + 1);
    }

    // Next question or finish
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }
};


  if (questions.length === 0) return null; // Wait until shuffled

  if (finished) {
    return (
      <ReviewPage 
        score={score}
        questions={questions}
        userAnswers={userAnswers}
        />
    );
  }


  return (
    <>
      {/* Full width AppBar */}
      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={((currentQuestion + 1) / questions.length) * 100}
        sx={{ mb: 2, height: 10, borderRadius: 5, marginTop: 5 }}
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {questions[currentQuestion].question}
          </Typography>

          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={selected === null}
            sx={{ mt: 2 }}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardContent>
      </Card>

      <Footer />
    </>
  );
}
