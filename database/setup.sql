
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  meeting_type VARCHAR(20) NOT NULL
    CHECK (meeting_type IN ('testimony', 'regular', 'stake', 'general', 'special')),
  presiding VARCHAR(255) NOT NULL,
  conducting VARCHAR(255) NOT NULL,
  announcements TEXT[] DEFAULT '{}',
  opening_hymn JSONB NOT NULL,
  opening_prayer VARCHAR(255) NOT NULL,
  ward_business JSONB DEFAULT '[]',
  stake_business BOOLEAN DEFAULT false,
  sacrament_hymn JSONB NOT NULL,
  speakers JSONB DEFAULT '[]',
  closing_hymn JSONB NOT NULL,
  closing_prayer VARCHAR(255) NOT NULL
);

INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES

('2026-01-04', 'testimony', 'Bishop Thompson', 'Brother Nakamura',
 '{}',
 '{"number":134,"title":"I Believe in Christ"}', 'Sister Park',
 '[]', false,
 '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
 '[]',
 '{"number":219,"title":"Because I Have Been Given Much"}',
 'Brother Alvarez'),

('2026-01-11', 'regular', 'Bishop Thompson', 'Brother Nakamura',
 ARRAY['Ward temple night: Jan 30'],
 '{"number":2,"title":"The Spirit of God"}', 'Sister Ramirez',
 '[{"description":"Sustaining of new Sunday School president"}]', true,
 '{"number":169,"title":"In Remembrance of Thy Suffering"}',
 '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},{"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]',
 '{"number":31,"title":"O God, Our Help in Ages Past"}',
 'Brother Lewis'),

('2026-01-18', 'regular', 'Bishop Thompson', 'Sister Torres',
 '{}',
 '{"number":85,"title":"How Firm a Foundation"}', 'Brother Kim',
 '[]', false,
 '{"number":173,"title":"While of These Emblems We Partake"}',
 '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},{"name":"Youth Choir","topic":"","type":"musical-number"}]',
 '{"number":226,"title":"Improve the Shining Moments"}',
 'Sister Jensen'),

('2026-01-25', 'stake', 'President Gimenez', 'President Samuel White',
 '{}',
 '{"number":27,"title":"Praise to the Man"}', 'Sister Grace Hall',
 '[]', true,
 '{"number":193,"title":"I Stand All Amazed"}',
 '[{"name":"President Gimenez","topic":"Faith in Christ","type":"speaker"}]',
 '{"number":267,"title":"How Wondrous and Great"}',
 'Brother White'),

('2026-02-01', 'regular', 'Bishop Smith', 'Sister Lee',
 '{}',
 '{"number":6,"title":"Redeemer of Israel"}', 'Sister Park',
 '[]', false,
 '{"number":185,"title":"Reverently and Meekly Now"}',
 '[{"name":"Elder Carter","topic":"Hope in Jesus Christ","type":"speaker"}]',
 '{"number":134,"title":"I Believe in Christ"}',
 'Brother Jones'),

('2026-02-08', 'testimony', 'Bishop Smith', 'Brother Jones',
 '{}',
 '{"number":2,"title":"The Spirit of God"}', 'Sister Williams',
 '[]', false,
 '{"number":169,"title":"In Remembrance of Thy Suffering"}',
 '[{"name":"Ward members","topic":"Testimonies","type":"speaker"}]',
 '{"number":31,"title":"O God, Our Help in Ages Past"}',
 'Sister Brown'),

('2026-02-15', 'general', 'President Green', 'President White',
 '{}',
 '{"number":1,"title":"The Morning Breaks"}', 'Sister Hall',
 '[]', false,
 '{"number":193,"title":"I Stand All Amazed"}',
 '[{"name":"Sister Hall","topic":"Discipleship","type":"speaker"}]',
 '{"number":267,"title":"How Wondrous and Great"}',
 'Brother White'),

('2026-02-22', 'regular', 'Bishop Smith', 'Sister Lee',
 '{}',
 '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}', 'Brother Kim',
 '[]', false,
 '{"number":188,"title":"Thy Will, O Lord, Be Done"}',
 '[{"name":"Youth Choir","topic":"Come, Thou Fount","type":"musical-number"}]',
 '{"number":85,"title":"How Firm a Foundation"}',
 'Sister Jensen')

ON CONFLICT (date) DO NOTHING;
