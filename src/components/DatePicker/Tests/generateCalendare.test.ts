import { generateCalendar } from "../generateCalendar";

describe('generateCalendar', () => {
  const months = [
    { month: 0, name: 'January' },
    { month: 1, name: 'February' },
    { month: 2, name: 'March' },
    { month: 3, name: 'April' },
    { month: 4, name: 'May' },
    { month: 5, name: 'June' },
    { month: 6, name: 'July' },
    { month: 7, name: 'August' },
    { month: 8, name: 'September' },
    { month: 9, name: 'October' },
    { month: 10, name: 'November' },
    { month: 11, name: 'December' },
  ];
  for (const { month, name } of months) {
    it(`should generate correct number of days for ${name} 2023`, () => {
      const calendar = generateCalendar(2023, month);
      expect(calendar.length).toBe(42);
    });
  }

  it('should generate correct number of days for current month and year', () => {
    const currentDate = new Date();
    const calendar = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    expect(calendar.length).toBeGreaterThan(28);
    expect(calendar.length).toBeLessThan(50);
    expect(calendar.filter(day => day.inActive === false).length).toBe(lastDateOfMonth);
  });

  it('should generate days with correct date format', () => {
    const calendar = generateCalendar(2023, 0);
    for (const day of calendar) {
      expect(day.fullDate).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    }
  });
  
});
