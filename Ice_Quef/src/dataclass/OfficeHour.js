export class OfficeHour {
  constructor(facultyName,
              day,
              startTime,
              endTime,
              initialDate,
              terminalDate,
              courseTag,
              courseNumber,
              id) {
    this.facultyName = facultyName;
    // Sunday - Saturday: 0 - 6
    this.day = day;
    // hh:mm
    this.startTime = startTime;
    // hh:mm
    this.endTime = endTime;
    // mm:dd:yy
    this.initialDate = initialDate;
    // mm:dd:yy
    this.terminalDate = terminalDate;
    // eg. CS, Bio, Chem
    this.courseTag = courseTag;
    // eg. 520, 320, 326
    this.courseNumber= courseNumber;
    this.id = id;
  }
}
