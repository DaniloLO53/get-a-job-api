insert into "workers"(nickname, email, password) values('João Tech', 'teste1@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Edu Limpeza', 'teste2@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Limpuz', 'teste3@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Daniel Alberto', 'teste4@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Zé Pedreiro', 'teste5@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Luciana Stylus', 'teste6@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Léo Cabelo', 'teste7@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Zé da Rosca', 'teste8@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Marisa', 'teste9@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Maria Manicure', 'teste10@gmail.com', '123123Aa*');
insert into "workers"(nickname, email, password) values('Fabíola Advogada', 'teste11@gmail.com', '123123Aa*');

select * from jobs;

insert into "jobs"(worker_id, title, description)
values(1, 'Engenheiro Mecânico Sênior', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(2, 'Engenheiro de Software Júnior', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(3, 'Techlead', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(4, 'Jardineiro', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(5, 'Analista de Sistemas', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(6, 'Gerente de Loja', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(7, 'Farmacêutico', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(8, 'Gerente Comercial', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(9, 'Product Manager', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(10, 'Product Manager', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(11, 'Analista de Dados', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(1, 'Engenheiro Eletricista', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(2, 'UI / UX Designer', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(3, 'Analista de Sistemas', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(4, 'Vendedor', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(5, 'Professor Engenheiro de Materiais', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(6, 'Segurança', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(7, 'Tecnico em Química', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(8, 'Vendedor', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(9, 'Segurança', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(10, 'Assistente Comercial', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(11, 'Telemarketing', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(1, 'Engenheiro Nuclear', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');
insert into "jobs"(worker_id, title, description)
values(2, 'Estágio Desenvolvimento de Software', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum');

select * from "jobs";

insert into "location_jobs"(job_id, state, city, region) values(1, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(2, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(3, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(4, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(5, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(6, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(7, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(8, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(9, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(10, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(11, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(12, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(13, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(14, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(15, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(16, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(17, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(18, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(19, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(20, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(21, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(22, 'RJ', 'Rio de Janeiro', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(23, 'SP', 'São Paulo', 'Zona Norte');
insert into "location_jobs"(job_id, state, city, region) values(24, 'RJ', 'Rio de Janeiro', 'Zona Norte');

insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(1, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(2, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(3, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(4, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(5, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(6, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(7, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(8, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(9, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(10, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(11, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(12, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(13, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(14, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(15, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(16, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(17, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(18, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(19, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(20, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(21, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(22, '06-05-2023', '8:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(23, '15-05-2023', '12:00', '14:00');
insert into "schedules"(job_id, day, day_hour_start, day_hour_end) values(24, '06-05-2023', '8:00', '14:00');
