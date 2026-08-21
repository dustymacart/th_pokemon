IF OBJECT_ID(N'dbo.Cards', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Cards
    (
        Id              int IDENTITY(1,1) NOT NULL CONSTRAINT PK_Cards PRIMARY KEY,
        Name            nvarchar(200) NOT NULL,
        CollectorNumber nvarchar(50) NOT NULL,
        SetName         nvarchar(200) NOT NULL,
        Rarity          nvarchar(100) NOT NULL,
        Condition       nvarchar(100) NOT NULL,
        Quantity        int NOT NULL CONSTRAINT CK_Cards_Quantity CHECK (Quantity >= 0)
    );

    CREATE INDEX IX_Cards_CollectorNumber ON dbo.Cards (CollectorNumber);
END;
