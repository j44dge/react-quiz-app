using Microsoft.EntityFrameworkCore;

namespace Backend.DBModels
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Category -> Questions (1:M)
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Questions)
                .WithOne(q => q.Category)
                .HasForeignKey(q => q.CategoryId);

            // Question -> Options (1:M)
            modelBuilder.Entity<Question>()
                .HasMany(q => q.Options)
                .WithOne(o => o.Question)
                .HasForeignKey(o => o.QuestionId);

            // Quiz -> Questions (M:N) ?
            // Your diagram shows a 1:M from Quiz to Questions,
            // but usually a quiz contains many questions and questions can belong to many quizzes.
            // If you really want 1:M:
            // modelBuilder.Entity<Quiz>()
            //     .HasMany<Question>()
            //     .WithOne() // would need a QuizId FK in Questions
            //     .HasForeignKey(q => q.QuizId);
        }
    }
}
