import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateQuoteForm,
  validateMeetingForm,
  generateWhatsAppLink,
  generateReferenceNumber,
  filterProducts,
} from './rules.ts';
import type { ProductItem } from './rules.ts';

test('validateQuoteForm catches empty or invalid fields', () => {
  const emptyResult = validateQuoteForm({
    companyName: '',
    contactName: '',
    email: 'bad-email',
    phone: '123',
    country: '',
    productOrCategory: '',
    requirements: 'short',
  });

  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.companyName);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.country);
  assert.ok(emptyResult.errors.requirements);
});

test('validateQuoteForm blocks spam honeypot', () => {
  const result = validateQuoteForm({
    companyName: 'ACME Construction LLC',
    contactName: 'John Doe',
    email: 'john@acme.ae',
    phone: '+971501234567',
    country: 'United Arab Emirates',
    productOrCategory: 'Safety Shoes',
    requirements: 'Need 500 pairs of SS-08 S1P safety shoes for construction project.',
    honeypot: 'bot spam value',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.bot);
});

test('validateQuoteForm accepts valid input', () => {
  const result = validateQuoteForm({
    companyName: 'Dubai Utility Contracting LLC',
    contactName: 'Ahmad Al Mansoori',
    email: 'procurement@duc.ae',
    phone: '+971557328048',
    country: 'United Arab Emirates',
    productOrCategory: 'Safety Footwear & Boots',
    requirements: 'Requesting formal quotation for 250 units of EN ISO 20345 certified safety footwear.',
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateMeetingForm validates required fields and accepts valid meeting bookings', () => {
  const invalid = validateMeetingForm({
    fullName: '',
    companyName: '',
    email: 'not-an-email',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    topicOfInterest: 'Footwear',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.preferredDate);
  assert.ok(invalid.errors.preferredTime);

  const valid = validateMeetingForm({
    fullName: 'Sultan Al Qasimi',
    companyName: 'Emirates Energy Authority',
    email: 'sultan@eea.gov.ae',
    phone: '+971557328048',
    preferredDate: '2026-10-21',
    preferredTime: '11:00 AM',
    boothLocation: 'Booth A-42, Hall 3',
    topicOfInterest: 'Corporate Fleet Tender',
    notes: 'Discussion regarding bulk supply of dielectric shoes and fire-retardant uniforms.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppLink formats click-to-chat URL with standardized +971 55 732 8048 number', () => {
  const link = generateWhatsAppLink('+971 55 732 8048', 'Hello Rangers Team', 'SS-08 S1P');
  assert.ok(link.startsWith('https://wa.me/971557328048?text='));
  assert.ok(link.includes(encodeURIComponent('SS-08 S1P')));
});

test('generateReferenceNumber produces formatted string', () => {
  const ref = generateReferenceNumber();
  assert.match(ref, /^RSS-\d{4}-\d{6}$/);
});

test('filterProducts matches by category, sku, name, and search term', () => {
  const sampleProducts: ProductItem[] = [
    {
      id: '1',
      name: 'SS-08 S1P (Black)',
      brand: 'RANGERS WAQ',
      category: 'safety-footwear',
      sku: 'SS-08-S1P',
      shortDescription: 'Composite toe & Kevlar midsole',
      certifications: 'EN ISO 20345:2022',
      specifications: ['Lightweight RBPU sole'],
      image: '',
    },
    {
      id: '2',
      name: '60/40 Polycotton Coverall',
      brand: 'RANGERS WORKWEAR',
      category: 'workwear',
      sku: 'RA-PCC160',
      shortDescription: 'Sanforized and mercerized coverall',
      certifications: 'EN ISO 13688:2013',
      specifications: ['Fabric weight 160 GSM'],
      image: '',
    },
  ];

  const searchResults = filterProducts(sampleProducts, 'Kevlar', 'all');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].sku, 'SS-08-S1P');

  const categoryResults = filterProducts(sampleProducts, '', 'workwear');
  assert.equal(categoryResults.length, 1);
  assert.equal(categoryResults[0].sku, 'RA-PCC160');

  const emptyResults = filterProducts(sampleProducts, 'nonexistent', 'all');
  assert.equal(emptyResults.length, 0);
});
