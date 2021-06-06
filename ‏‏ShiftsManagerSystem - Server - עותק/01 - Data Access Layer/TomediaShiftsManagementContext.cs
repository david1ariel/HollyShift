using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CtrlShift
{
    public partial class TomediaShiftsManagementContext : DbContext
    {
        public TomediaShiftsManagementContext()
        {
        }

        public TomediaShiftsManagementContext(DbContextOptions<TomediaShiftsManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Business> Businesses { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<RequestedShift> RequestedShifts { get; set; }
        public virtual DbSet<Setting> Settings { get; set; }
        public virtual DbSet<Shift> Shifts { get; set; }
        public virtual DbSet<ShiftType> ShiftTypes { get; set; }
        public virtual DbSet<ShiftsEmployee> ShiftsEmployees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-C2FEDD5\\SQLEXPRESS;Database=Tomedia Shifts Management;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Business>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Adress)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.BusinessId).ValueGeneratedOnAdd();

                entity.Property(e => e.BusinessName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.ContactName).HasMaxLength(15);

                entity.Property(e => e.ContactPhone).HasMaxLength(15);

                entity.Property(e => e.LineOfBusiness).HasMaxLength(15);

                entity.Property(e => e.ManagerName).HasMaxLength(20);

                entity.Property(e => e.Phone).HasMaxLength(15);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.EmployeeId).HasMaxLength(15);

                entity.Property(e => e.Adress).HasMaxLength(200);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.HireDate).HasColumnType("datetime");

                entity.Property(e => e.ImageFileName).HasMaxLength(1000);

                entity.Property(e => e.LastLoginDate).HasColumnType("datetime");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Notes).HasMaxLength(1000);

                entity.Property(e => e.Password).HasMaxLength(20);

                entity.Property(e => e.Phone1).HasMaxLength(50);

                entity.Property(e => e.Phone2).HasMaxLength(50);

                entity.Property(e => e.PostalCode).HasMaxLength(7);

                entity.Property(e => e.Role).HasMaxLength(15);

                entity.Property(e => e.Salt).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(30);

                entity.Property(e => e.Username).HasMaxLength(15);

                entity.Property(e => e.VerificationCode).HasMaxLength(50);
            });

            modelBuilder.Entity<RequestedShift>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.EmployeeId)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Employee)
                    .WithMany()
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RequestedShifts_Employees");

                entity.HasOne(d => d.Shift)
                    .WithMany()
                    .HasForeignKey(d => d.ShiftId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RequestedShifts_Shifts");
            });

            modelBuilder.Entity<Setting>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Shift>(entity =>
            {
                entity.Property(e => e.EndTime).HasColumnType("datetime");

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.Property(e => e.WantedOrUnwanted).HasMaxLength(50);

                entity.HasOne(d => d.ShiftType)
                    .WithMany(p => p.Shifts)
                    .HasForeignKey(d => d.ShiftTypeId)
                    .HasConstraintName("FK_Shifts_ShiftTypes");
            });

            modelBuilder.Entity<ShiftType>(entity =>
            {
                entity.HasIndex(e => e.TypeTitle)
                    .HasName("UQ__ShiftTyp__E8252B9ECAEF1AA1")
                    .IsUnique();

                entity.Property(e => e.TypeTitle)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<ShiftsEmployee>(entity =>
            {
                entity.Property(e => e.EmployeeId).HasMaxLength(15);

                entity.Property(e => e.State).HasMaxLength(50);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.ShiftsEmployees)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ShiftsEmployees_Employees");

                entity.HasOne(d => d.Shift)
                    .WithMany(p => p.ShiftsEmployees)
                    .HasForeignKey(d => d.ShiftId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ShiftsEmployees_Shifts");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
