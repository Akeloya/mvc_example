CREATE TABLE [dbo].[Requests]
(
	[Id] INT NOT NULL,
	[ApplicationId] INT NOT NULL,
	[Title] NVARCHAR(256) NOT NULL,
	[Email] NCHAR(128) NOT NULL,
	[ReqCompleteDate] SMALLDATETIME NULL,
	[Description] NVARCHAR(MAX),
	CONSTRAINT Requests_PK PRIMARY KEY(
		[Id]
	), 
    CONSTRAINT [FK_Requests_ToApplications] FOREIGN KEY ([ApplicationId]) REFERENCES [Applications]([Id])	
)

GO

CREATE INDEX [IX_Requests_ReqCompleteDate] ON [dbo].[Requests] ([ReqCompleteDate]) INCLUDE([ID])
GO

CREATE INDEX [IX_Requests_ApplicationId] ON [dbo].[Requests] ([ApplicationId])
