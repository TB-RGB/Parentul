-- Create users table with fields for Google authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    has_diag_in_family BOOLEAN,
    google_id VARCHAR(255) UNIQUE,
    profile_pic_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create children table
CREATE TABLE children (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL
);
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE
);

-- Create messages table with ON DELETE CASCADE
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ai_responses table with ON DELETE CASCADE
CREATE TABLE ai_responses (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
    response_type VARCHAR(80) NOT NULL,
    confidence_score FLOAT4 NOT NULL,
    processing_time INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_feedback table with ON DELETE CASCADE
CREATE TABLE user_feedback (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    rating BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create follow_ups table with ON DELETE CASCADE
CREATE TABLE follow_ups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    is_asked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Create user_preferences table
CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    notifications_email BOOLEAN DEFAULT TRUE,
    notifications_sms BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20) DEFAULT NULL
    notifications_push BOOLEAN DEFAULT FALSE,
    notifications_freq VARCHAR(10) DEFAULT '24',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create faq table
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    has_developmental_diagnosis BOOLEAN,
    question TEXT,
    answer TEXT
);





-- Temper Tantrums
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Temper Tantrums', FALSE, 'What is a temper tantrum?', 'A temper tantrum is when a child has an unplanned outburst of anger and frustration. Tantrums can be physical, verbal or both. Your child may act out, be disruptive and generally display unpleasant behaviors. Usually, they''re acting like this because they want or need something they can''t express with words.'),
('Temper Tantrums', FALSE, 'Are tantrums proportionate to the situation?', 'Tantrums are often disproportionate to the circumstances. In other words, children react very strongly to what is likely a mild situation. For example, you might tell your child to put away a toy or turn down their treat request. This may lead to thrashing, yelling and hitting.'),
('Temper Tantrums', FALSE, 'How should I handle a temper tantrum?', 'Try these strategies: 1) Find a distraction, 2) Stay calm, 3) Ignore the tantrum, 4) Keep them in sight, 5) Keep them safe, 6) Use a "time-in" away from the cause of the tantrum but in your presence.'),
('Temper Tantrums', TRUE, 'What is a temper tantrum for a child with developmental diagnosis?', 'A child who has trauma-related or neurological behavior disorders may express temper tantrums when they have an unplanned outburst of anger and frustration. Tantrums can be physical, verbal or both. The child may act out, be disruptive and generally display unpleasant behaviors.'),
('Temper Tantrums', TRUE, 'How should I handle tantrums for a child with developmental diagnosis?', 'The child needs to experience safety from the parent during their tantrum and not be threatened. It is critically important to not react in a negative or threatening manner. Use strategies similar to those for children without diagnosis, but with extra emphasis on ensuring the child feels safe.');

-- Lying
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Lying', FALSE, 'What is lying in children?', 'Lying is not telling or concealing the truth. It involves telling false statements or being untruthful. Lying is developmentally normal for children between the ages of 3-5.'),
('Lying', FALSE, 'Why do children lie?', 'Children lie for various reasons: 1) Escaping punishment, 2) Developing sense of morality, 3) Experimentation with their new ability to lie, 4) They may not realize it''s a lie or remember correctly.'),
('Lying', FALSE, 'How does lying develop in children?', 'Young children between 3 and 4 often can''t distinguish between fantasy and reality. Lying tends to peak between ages 3 to 8. As children grow older, their lies become more sophisticated, often to boost self-esteem or avoid punishment.'),
('Lying', FALSE, 'How should I handle lying?', 'The best approach is to: 1) Calmly explain why lying is not acceptable, 2) Reiterate your love for the child, 3) State facts when catching a lie, 4) Avoid severe punishments as they may increase lying, 5) Use age-appropriate consequences if needed, 6) Be a good role model.'),
('Lying', TRUE, 'Why do children with developmental diagnosis lie?', 'For children with developmental diagnoses, self-protection might be the main reason for lying behavior.'),
('Lying', TRUE, 'How should I handle lying in a child with developmental diagnosis?', 'The approach is similar to handling lying in children without diagnosis. However, it''s important to understand the underlying reasons for the behavior, which may be related to self-protection. Tailor your response to the child''s specific needs and capabilities.');

-- Meltdowns
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Meltdowns', FALSE, 'What is a meltdown?', 'A meltdown is when a child becomes emotionally unstable due to a disastrous event or happening, causing severe anger, frustrations or pain.'),
('Meltdowns', FALSE, 'What are common causes of meltdowns?', 'Common causes include ADHD, anxiety, learning problems, depression, irritability, autism, and sensory processing issues.'),
('Meltdowns', FALSE, 'What skills might children with frequent meltdowns be lacking?', 'Children with frequent meltdowns may lack skills in impulse control, problem solving, delaying gratification, negotiating, communicating wishes and needs, understanding appropriate behavior, and self-soothing.'),
('Meltdowns', FALSE, 'How can meltdowns become a vicious cycle?', 'If a child encounters a problem and resorts to meltdowns, they may learn that this helps them get their way. This reinforces the behavior, leading to more frequent meltdowns instead of developing adaptive problem-solving skills.'),
('Meltdowns', TRUE, 'What causes meltdowns in children with developmental diagnoses?', 'Brain development delay is often the main cause for children with neurological disorders or trauma-related behaviors.'),
('Meltdowns', TRUE, 'How should parents handle meltdowns in children with developmental diagnoses?', 'Parents should focus on understanding and nurturing brain development, using skills designed to help their child develop safely on a supported developmental track.');

-- Not Listening
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Not Listening', FALSE, 'What does it mean when a child isn''t listening?', 'When parents say their child isn''t listening, they often mean the child isn''t following directions or responding in a desired manner. This is rarely due to disobedience.'),
('Not Listening', FALSE, 'What are common reasons for not listening?', 'Common reasons include distraction, developmental stage, unmet needs, communication style, feeling disconnected, not wanting to stop current activity, not hearing instructions, not understanding time concepts, not wanting to do the task, difficulty remembering multiple instructions, or wanting to do a different activity.'),
('Not Listening', FALSE, 'How can I improve my child''s listening skills?', 'Try these strategies: 1) Spend one-on-one time daily, 2) Don''t interrupt when they''re engrossed in an activity, 3) Ensure you have their attention before speaking, 4) Use visual timers for time management, 5) Break down tasks into simple, one-step instructions, 6) Integrate their favorite activities into routines.'),
('Not Listening', FALSE, 'What if my child only listens when I yell?', 'If your child ignores you until you raise your voice, they may have been conditioned to wait for yelling. Avoid repeating requests and resorting to yelling. Make clear and concise requests without excessive repetition.'),
('Not Listening', FALSE, 'How can I foster better communication with my child?', 'Take time to actively listen to your child. When children feel heard and valued, they are more likely to reciprocate and listen to you. Also, try to understand and meet your child''s needs for autonomy and connection.');

-- Stealing
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Stealing', FALSE, 'What is stealing in the context of child behavior?', 'Stealing is taking another''s property without permission or legal right and without the intent of returning it.'),
('Stealing', FALSE, 'Why do children steal?', 'Children may steal due to a lack of self-control, envy, revenge, strong desire for an item, peer pressure, rebellion, or to impress peers. Younger children might not understand the concept of ownership.'),
('Stealing', FALSE, 'What are some psychological reasons for stealing?', 'Psychological reasons can include attention-seeking, impulse control disorders, lack of understanding, peer pressure, low self-esteem, or dealing with stress or trauma.'),
('Stealing', FALSE, 'How should I handle my child''s stealing?', 'Focus on connection, avoid lecturing and punishment, teach what''s wrong with stealing, help repair the damage, assess reasons together, show that honesty is a choice, be a role model, find other models of honesty, catch your child being honest, and help find better ways to get what they want.'),
('Stealing', FALSE, 'When should I seek professional help for my child''s stealing?', 'If the stealing continues or you think it may be a sign of more complex or serious problems, look for professional help.'),
('Stealing', TRUE, 'Are there specific considerations for children with developmental diagnoses who steal?', 'While the approach is similar, it''s important to consider that stealing in children with developmental diagnoses might be related to impulse control issues or a lack of understanding of social norms. Tailor your approach to the child''s specific needs and capabilities.');


-- Arguing
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Arguing', FALSE, 'What is arguing in the context of child behavior?', 'Arguing is when a child gives reasons or cites evidence to support their idea or point of view, with the intent to persuade others to their perspective. While often viewed negatively, arguing can be an opportunity to teach critical thinking and problem-solving skills.'),
('Arguing', FALSE, 'Why do children argue?', 'Children often argue because they feel a lack of control or autonomy in their lives. They may use arguments and negotiations to cope with the lack of control over certain aspects of their lives.'),
('Arguing', FALSE, 'How can I handle a child who argues frequently?', 'Set clear boundaries, model respectful disagreement, give choices to help children feel more in control, teach problem-solving skills, stay calm, schedule calm discussions, and use positive reinforcement when they handle disagreements well.'),
('Arguing', TRUE, 'How should I handle arguing with a child who has developmental issues?', 'The approach is similar to handling arguing in children without developmental issues. However, it''s important to understand that the child may have additional challenges in communication or emotional regulation. Tailor your approach to the child''s specific needs and capabilities, and focus on teaching clear, respectful communication skills.');

-- Bedtime
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Bedtime', FALSE, 'How can I establish a good bedtime routine?', 'Establish a consistent bedtime routine that includes activities like brushing teeth, reading a book, singing a lullaby, and cuddling. Provide comfort items, encourage relaxation techniques, and create a bedtime box filled with calming activities.'),
('Bedtime', FALSE, 'What are some tips for making bedtime easier?', 'Create a calm and safe environment, read bedtime stories, sing quiet songs, listen to instrumental music or lullabies, and consider lying by the child''s bedside until they fall asleep.'),
('Bedtime', TRUE, 'How can I help a child with trauma or developmental issues at bedtime?', 'Children who have experienced trauma may need additional steps to feel safe and secure at bedtime. Focus on creating a very calm and safe environment, be consistent with routines, offer extra comfort and reassurance, and be patient as the child learns to feel secure.');

-- Disobedience
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Disobedience', FALSE, 'What is disobedience in children?', 'Disobedience is the failure or refusal to obey rules or submit to someone in authority. It can manifest as defiance or abstinence from following instructions or rules.'),
('Disobedience', FALSE, 'How should I handle disobedience?', 'Set clear, defined boundaries and explain the reasons behind them. Avoid constant labeling, refusals, and disagreements. Create a positive family environment. Use time-ins instead of time-outs, and reward obedient and respectful behavior.'),
('Disobedience', FALSE, 'What are some common causes of disobedience?', 'Common causes include undefined boundaries, constant labeling, frequent refusals and disagreements from parents, and a negative family environment.'),
('Disobedience', TRUE, 'How should I approach disobedience in a child with developmental issues?', 'For children with developmental issues, it''s crucial to ensure that the child understands the rules and expectations. Use clear, simple language, visual aids if necessary, and be consistent. Focus on positive reinforcement for good behavior rather than punishment for disobedience.');

-- Hitting/Aggression
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Hitting/Aggression', FALSE, 'Why do children hit or show aggression?', 'Children may hit or show aggression when learning to express themselves, testing boundaries, feeling overwhelmed or frustrated, lacking coping skills, or having poor impulse control.'),
('Hitting/Aggression', FALSE, 'How should I respond to hitting or aggressive behavior?', 'Respond calmly but firmly. Teach the child about the impact of their actions, help them identify and express their emotions appropriately, and provide alternative ways to cope with frustration or anger.'),
('Hitting/Aggression', FALSE, 'How can I prevent aggressive behavior?', 'Set clear expectations, teach emotional regulation skills, provide a calm environment, and model appropriate behavior. Help children learn to express their needs and wants verbally.'),
('Hitting/Aggression', TRUE, 'How should I handle aggression in a child with developmental issues?', 'For children with developmental issues, it''s important to identify any sensory or communication challenges that might be contributing to the aggressive behavior. Work with specialists to develop appropriate strategies, and focus on teaching alternative ways to communicate needs and frustrations.');

-- Screaming
INSERT INTO faq (category, has_developmental_diagnosis, question, answer) VALUES
('Screaming', FALSE, 'Why do children scream?', 'Children often scream when they haven''t learned how to express themselves in a safe manner. Screaming can be a way of coping with overwhelming emotions or seeking attention.'),
('Screaming', FALSE, 'How can I stop my child from screaming?', 'Teach your child to recognize and cope with their emotions. Label and validate their feelings, and teach coping skills during calm moments. Avoid trying to reason with a child while they''re screaming, as this may escalate the behavior.'),
('Screaming', FALSE, 'What''s a good technique for teaching emotional expression?', 'Use everyday situations to label emotions and demonstrate coping strategies. For example, say "Mommy is frustrated right now because we''re sitting in traffic. I''m going to take three deep breaths to help calm me down."'),
('Screaming', TRUE, 'How should I handle screaming in a child with emotional trauma?', 'For children with emotional trauma, it''s crucial to establish a safe environment. Try to understand the meaning behind the emotion triggering the screaming. For example, anger often stems from feeling hurt, while frustration often comes from unfulfilled expectations. Address these underlying issues to help the child learn to communicate more effectively.');