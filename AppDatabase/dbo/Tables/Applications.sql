CREATE TABLE [dbo].[Applications]
(
	[Id] INT NOT NULL,
	[Title] NVARCHAR(256) NOT NULL,
	CONSTRAINT Applications_PK PRIMARY KEY(
		[Id]
	)
)
