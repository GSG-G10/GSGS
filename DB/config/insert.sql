
insert into users (username, email, password, fname) values ('dfwf', 'ssdfwdg', '$2b$10$4rBq88jdWPveVmRhqsANIOG394.f/XnBBs6Cd0Kwd62E62lcVbKeS', 'sdg');

insert into comments_id_post (username, date, text) values ('divluffy', '25082000', 'weoghwoingoienwiog');



\i 'E:\\GSGs\\DB\\config\\init.sql';
\i 'E:\\GSGs\\DB\\config\\insert.sql';


select * from hanutyvo_following;
select * from muzon_followers;
select * from cupepafi_following;

select * from cupepafi_followers;
select * from cibuqat_following;
select * from cibuqat_followers;

SELECT reltuples AS estimate FROM pg_class WHERE relname = 'cupepafi_following';
SELECT count(*) FROM chat;



select * from voquraw_likes;
select * from luffy_posts;
select * from jowexec_posts;
select * from mostafa_posts;
select * from users;
select * from profiles;
select * from comments_id_post;
select * from all_users_posts;
select * from lorof_posts;
select * from comments_44791796258951730000;
UPDATE lorof_posts SET text_con = 'xxxxxxxxxxxxxxx' WHERE id_post= '23711472165555323000';

select * from cykyno_likes;


select * from lorof_posts where id_post = '26823482157553070000';

comments_
drop table profiles,posts,all_users_posts,follow_username,comments_id_post;
SELECT avatar FROM profiles where username = 'luffy';

SELECT * FROM chat ORDER  BY ctid DESC;

CREATE TABLE ${username}_likes(
id SERIAL PRIMARY KEY,
id_post TEXT NOT NULL,
like TEXT NOT NULL,
dislike TEXT NOT NULL);
CREATE TABLE nour_likes(
id SERIAL PRIMARY KEY,
id_post TEXT NOT NULL,
onlike TEXT NOT NULL,
dislike TEXT NOT NULL);


CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    id_post TEXT NOT NULL,
    date TEXT NOT NULL,
    text_con TEXT NOT NULL,
    img_con TEXT NOT NULL,
    video_con TEXT NOT NULL,
    loves  VARCHAR(20) NOT NULL,
    hates  VARCHAR(20) NOT NULL,
    shares  VARCHAR(20) NOT NULL,
    id_Comments  TEXT NOT NULL
);

 CREATE TABLE comments_id_post(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    date TEXT NOT NULL,
    text  TEXT NOT NULL
);




CREATE TABLE follow_username(
    id SERIAL PRIMARY KEY,
    follower  VARCHAR(100) NOT NULL,
    following  VARCHAR(100) NOT NULL
);

