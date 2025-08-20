-- Seed tariff data with sample information
INSERT INTO public.tariffs (hs_code, product_description, origin_country, destination_country, tariff_rate, additional_duties, trade_agreement, effective_date, source) VALUES
('8471.30.01', 'Portable automatic data processing machines, weighing not more than 10 kg', 'China', 'United States', 7.50, 0.00, 'MFN', '2024-01-01', 'USTR'),
('8471.30.01', 'Portable automatic data processing machines, weighing not more than 10 kg', 'Germany', 'United States', 0.00, 0.00, 'EU-US Trade Agreement', '2024-01-01', 'USTR'),
('6203.42.40', 'Men''s or boys'' trousers and breeches of cotton', 'Bangladesh', 'United States', 16.60, 0.00, 'GSP', '2024-01-01', 'USTR'),
('6203.42.40', 'Men''s or boys'' trousers and breeches of cotton', 'Vietnam', 'United States', 17.70, 0.00, 'MFN', '2024-01-01', 'USTR'),
('0901.21.00', 'Coffee, roasted, not decaffeinated', 'Colombia', 'United States', 0.00, 0.00, 'USMCA', '2024-01-01', 'USTR'),
('0901.21.00', 'Coffee, roasted, not decaffeinated', 'Brazil', 'United States', 0.00, 0.00, 'MFN', '2024-01-01', 'USTR'),
('8517.12.00', 'Telephones for cellular networks or for other wireless networks', 'China', 'United States', 0.00, 25.00, 'Section 301 Tariffs', '2024-01-01', 'USTR'),
('8517.12.00', 'Telephones for cellular networks or for other wireless networks', 'South Korea', 'United States', 0.00, 0.00, 'KORUS FTA', '2024-01-01', 'USTR'),
('7208.10.00', 'Flat-rolled products of iron or non-alloy steel', 'China', 'United States', 0.00, 25.00, 'Section 232 Tariffs', '2024-01-01', 'Commerce Dept'),
('7208.10.00', 'Flat-rolled products of iron or non-alloy steel', 'Canada', 'United States', 0.00, 0.00, 'USMCA', '2024-01-01', 'Commerce Dept'),
('1701.14.20', 'Raw sugar, cane sugar', 'Brazil', 'United States', 1.46, 0.00, 'TRQ', '2024-01-01', 'USTR'),
('1701.14.20', 'Raw sugar, cane sugar', 'Australia', 'United States', 1.46, 0.00, 'AUSFTA', '2024-01-01', 'USTR'),
('8703.23.00', 'Motor cars with spark-ignition internal combustion engine', 'Japan', 'United States', 2.50, 0.00, 'MFN', '2024-01-01', 'USTR'),
('8703.23.00', 'Motor cars with spark-ignition internal combustion engine', 'Germany', 'United States', 2.50, 0.00, 'MFN', '2024-01-01', 'USTR'),
('6109.10.00', 'T-shirts, singlets and other vests, knitted or crocheted, of cotton', 'India', 'United States', 16.50, 0.00, 'GSP', '2024-01-01', 'USTR'),
('6109.10.00', 'T-shirts, singlets and other vests, knitted or crocheted, of cotton', 'Mexico', 'United States', 0.00, 0.00, 'USMCA', '2024-01-01', 'USTR');
