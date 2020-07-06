CREATE TABLE [dbo].[Applications]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[Title] NVARCHAR(256) NOT NULL,
	CONSTRAINT Applications_PK PRIMARY KEY(
		[Id]
	)
)
