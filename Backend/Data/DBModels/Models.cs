using System;
using System.Collections.Generic;

namespace Backend.DBModels
{
    public class Category
    {
        public int Id { get; set; }  // EF will treat this as PK automatically
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }

    public class Question
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string QuestionText { get; set; } = null!;
        public string? Explanation { get; set; }

        public Category Category { get; set; } = null!;
        public ICollection<Option> Options { get; set; } = new List<Option>();
    }

    public class Option
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string OptionText { get; set; } = null!;
        public bool IsCorrect { get; set; }

        public Question Question { get; set; } = null!;
    }

    public class Quiz
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // Assuming you’ll later add a Users table
        public int Score { get; set; }
        public int Total { get; set; }

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
