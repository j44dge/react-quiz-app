import { Container, Card, Typography, CardContent } from "@mui/material";


type ReviewPageProps = {
  score: number;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  userAnswers: string[];
};



export default function ReviewPage({ score, questions, userAnswers }: ReviewPageProps) {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Quiz Finished!
            </Typography>
            <Typography variant="h6">
              Your score: {score} / {questions.length}
            </Typography>
          </CardContent>
        </Card>

        {questions.map((q: any, i: any) => {
          const userAnswer = userAnswers[i];
          const correctAnswer = q.options[q.correctIndex];
          const isCorrect = userAnswer === correctAnswer;

          return (
            <Card key={i} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Q{i + 1}. {q.question}
                </Typography>

                <Typography
                  variant="body1"
                  color={isCorrect ? "success.main" : "error.main"}
                >
                  Your answer: {userAnswer}
                </Typography>

                {!isCorrect && (
                  <Typography variant="body1" color="success.main">
                    Correct answer: {correctAnswer}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}
                >
                  {q.explanation}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
}
