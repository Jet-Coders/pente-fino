USE DB_PENTEFINO;

CREATE TABLE `TB_SCHEDULES` (
  `SCHEDULE_ID` int(11) NOT NULL,
  `SCHEDULE_SERVICES` int(11) NOT NULL,
  `SCHEDULE_CLIENT` int(11) NOT NULL,
  `SCHEDULE_ATTENDANT` int(11) NOT NULL,
  `SCHEDULE_DATE` datetime DEFAULT NULL,
  `SCHEDULE_VALUE` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `TB_SERVICES` (
  `SERVICE_ID` int(11) NOT NULL,
  `SERVICE_NAME` varchar(30) NOT NULL,
  `SERVICE_DESCRIPTION` varchar(60) NOT NULL,
  `SERVICE_VALUE` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO TB_SERVICES (SERVICE_ID, SERVICE_NAME, SERVICE_DESCRIPTION, SERVICE_VALUE)
VALUES
    (1, 'Corte Completo', 'Inclui corte de cabelo e lavagem', 30.00),
    (2, 'Acabamento', 'Finalização e ajustes', 15.00),
    (3, 'Penteado', 'Estilização do cabelo', 20.00),
    (4, 'Barba Completa', 'Inclui barba e lavagem', 25.00),
    (5, 'Acabamento de Barba', 'Finalização e ajustes na barba', 12.00);

CREATE TABLE `TB_USERS` (
  `USER_ID` int(11) NOT NULL,
  `USER_FIRSTNAME` varchar(30) NOT NULL,
  `USER_LASTNAME` varchar(40) NOT NULL,
  `USER_BIRTH` date DEFAULT NULL,
  `USER_EMAIL` varchar(60) NOT NULL,
  `USER_PASSWORD` varchar(60) NOT NULL,
  `USER_RANK` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `TB_USERS` MODIFY `USER_PASSWORD` varchar(60) NOT NULL;
ALTER TABLE `TB_USERS` ADD `USER_PHONE` varchar(20) NOT NULL; 
ALTER TABLE `TB_USERS` MODIFY `USER_PHONE` varchar(20) NOT NULL; 

INSERT INTO `TB_USERS` ( `USER_FIRSTNAME`, `USER_LASTNAME`, `USER_BIRTH`, `USER_EMAIL`, `USER_PASSWORD`, `USER_RANK`) VALUES
( 'John', 'Doe', '1990-05-15', 'john.doe@example.com', 'hashed_1', 1),
( 'Jane', 'Smith', '1985-08-22', 'jane.smith@example.com', 'hashed_2', 3),
( 'Bob', 'Johnson', '1993-02-10', 'bob.johnson@example.com', 'hashed_3', 3),
( 'Alice', 'Williams', '1988-11-30', 'alice.williams@example.com', 'hashed_4', 3),
( 'Charlie', 'Brown', '1995-07-05', 'charlie.brown@example.com', 'hashed_5', 2);

ALTER TABLE `TB_SCHEDULES`
  ADD PRIMARY KEY (`SCHEDULE_ID`),
  ADD UNIQUE KEY `SCHEDULE_CLIENT` (`SCHEDULE_CLIENT`),
  ADD UNIQUE KEY `SCHEDULE_ATTENDANT` (`SCHEDULE_ATTENDANT`),
  ADD KEY `SCHEDULE_SERVICES` (`SCHEDULE_SERVICES`);


ALTER TABLE `TB_SERVICES`
  ADD PRIMARY KEY (`SERVICE_ID`);

ALTER TABLE `TB_USERS`
  ADD PRIMARY KEY (`USER_ID`),
  ADD UNIQUE KEY `USER_EMAIL` (`USER_EMAIL`);

ALTER TABLE `TB_SCHEDULES`
  MODIFY `SCHEDULE_ID` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `TB_SERVICES`
  MODIFY `SERVICE_ID` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `TB_USERS`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `TB_SCHEDULES`
  ADD CONSTRAINT `tb_schedules_ibfk_1` FOREIGN KEY (`SCHEDULE_SERVICES`) REFERENCES `TB_SERVICES` (`SERVICE_ID`),
  ADD CONSTRAINT `tb_schedules_ibfk_2` FOREIGN KEY (`SCHEDULE_CLIENT`) REFERENCES `TB_USERS` (`USER_ID`),
  ADD CONSTRAINT `tb_schedules_ibfk_3` FOREIGN KEY (`SCHEDULE_ATTENDANT`) REFERENCES `TB_USERS` (`USER_ID`);
