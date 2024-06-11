BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Courses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(1000),
    [imgSrc] NVARCHAR(max),
    [created_by] INT,
    [created_at] DATETIME CONSTRAINT [DF__Courses__created__3A81B327] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME,
    [total_videos] INT CONSTRAINT [DF__Courses__total_v__3B75D760] DEFAULT 0,
    [display_order] INT,
    CONSTRAINT [PK__Courses__3213E83F9EC1DCBD] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(100) NOT NULL,
    [password] NVARCHAR(255),
    [role] NVARCHAR(10),
    [created_at] DATETIME CONSTRAINT [DF__Users__created_a__36B12243] DEFAULT CURRENT_TIMESTAMP,
    [update_at] DATETIME,
    CONSTRAINT [PK__Users__3213E83F6FF2D64F] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__Users__AB6E61644B37D91F] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[UsersCourses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [course_id] INT NOT NULL,
    [watched] INT CONSTRAINT [DF__UsersCour__watch__3E52440B] DEFAULT 0,
    CONSTRAINT [PK__UsersCou__3213E83FF17F0845] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Videos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(200) NOT NULL,
    [url] NVARCHAR(500) NOT NULL,
    [course_id] INT,
    [created_at] DATETIME CONSTRAINT [DF__Videos__created___4316F928] DEFAULT CURRENT_TIMESTAMP,
    [display_order] INT,
    [updated_at] DATETIME,
    [description] NVARCHAR(1000),
    CONSTRAINT [PK__Videos__3213E83FBE2DE3B7] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UsersCourses] ADD CONSTRAINT [FK__UsersCour__cours__4AB81AF0] FOREIGN KEY ([course_id]) REFERENCES [dbo].[Courses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UsersCourses] ADD CONSTRAINT [FK__UsersCour__user___49C3F6B7] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Videos] ADD CONSTRAINT [FK__Videos__course_i__3F466844] FOREIGN KEY ([course_id]) REFERENCES [dbo].[Courses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
