import validate, { T } from '../src/index';

describe('string type validator', function () {
  test('normal string', function () {
    expect(validate('hello', T.string())).resolves.toBe('hello');
    expect(validate('中文', T.string())).resolves.toBe('中文');
  });

  test('number to string', function () {
    expect(validate(15, T.string())).resolves.toBe('15');
  });

  test('NaN is invalid string', function () {
    expect(validate(NaN, T.string())).rejects.toThrow('must be a string');
  });

  test('boolean to string', function () {
    expect(validate(true, T.string())).rejects.toThrow('must be a string');
    expect(validate(false, T.string())).rejects.toThrow('must be a string');
  });

  test('null & undefined to be empty string', function () {
    expect(validate(undefined, T.string())).resolves.toBe('');
    expect(validate(null, T.string())).resolves.toBe('');
  });

  test('plain object to string', function () {
    const data = {
      a: '123913',
      toString() {
        return this.a + '++';
      },
    };
    expect(validate(data, T.string())).resolves.toBe('123913++');
  });

  test('class instance implements toString', function () {
    class A {
      toString() {
        return 'aaa';
      }
    }

    const a = new A();
    expect(validate(a, T.string())).resolves.toBe('aaa');
  });

  test('class has static toString', function () {
    class B {
      static toString() {
        return 'BBB';
      }
    }

    expect(validate(B, T.string())).resolves.toBe('BBB');
  });
});

describe('string parts', function () {
  test('startsWith', function () {
    expect(validate('Welcome', T.string().startsWith('We'))).resolves.toBe('Welcome');
    expect(validate('Welcome', T.string().startsWith('we'))).rejects.toThrow('starts');
  });

  test('endsWith', function () {
    expect(validate('Welcome', T.string().endsWith('me'))).resolves.toBe('Welcome');
    expect(validate('Welcome', T.string().endsWith('xt'))).rejects.toThrow('ends');
  });

  test('email', function () {
    expect(validate('admin@example.com', T.string().email())).resolves.toBe('admin@example.com');
    expect(validate('xxx', T.string().email())).rejects.toThrow('Email');
  });

  test('ipv4', function () {
    expect(validate('192.168.0.1', T.string().ipv4())).resolves.toBe('192.168.0.1');
    expect(validate('10.288.45.1', T.string().ipv4())).rejects.toThrow('IPv4');
  });

  test('ipv6', function () {
    expect(validate('::1', T.string().ipv6())).resolves.toBe('::1');
    expect(validate('fe08:37a2::1', T.string().ipv6())).resolves.toBe('fe08:37a2::1');
    expect(validate('192.168.1.1', T.string().ipv6())).rejects.toThrow('IPv6');
    expect(validate('what', T.string().ipv6())).rejects.toThrow('IPv6');
  });

  test('date', function () {
    expect(validate('01 Jan 2018', T.string().date())).resolves.toBe('01 Jan 2018');
    expect(validate('2018/01/01', T.string().date())).resolves.toBe('2018/01/01');
    expect(validate('alklajflakjfklj', T.string().date())).rejects.toThrow('not a valid date');
  });

  test('dateFormat', function () {
    expect(validate('2018-01-01', T.string().dateFormat('YYYY-MM-DD'))).resolves.toBe('2018-01-01');
    expect(validate('2018/01/01', T.string().dateFormat('YYYY-MM-DD'))).rejects.toThrow('date string match');
  });

  test('contains', function () {
    expect(validate('hello world', T.string().contains('wor'))).resolves.toBe('hello world');
    expect(validate('welcome', T.string().contains('oca'))).rejects.toThrow('contains');
  });

  test('mobile', function () {
    expect(validate('13800138000', T.string().mobile())).resolves.toBe('13800138000');
    expect(validate('+8613002302033', T.string().mobile())).resolves.toBe('+8613002302033');
    expect(validate('12700230203', T.string().mobile())).rejects.toThrow('mobile phone number');
  });

  test('alpha', function () {
    expect(validate('welcome', T.string().alpha())).resolves.toBe('welcome');
    expect(validate('we1c0me', T.string().alpha())).rejects.toThrow('alphabetic');
  });

  test('alphanumeric', function () {
    expect(validate('we1c0me', T.string().alphanumeric())).resolves.toBe('we1c0me');
    expect(validate('中文', T.string().alphanumeric())).rejects.toThrow('alphanumeric');
  });

  test('slug', function () {
    expect(validate('welcome-to-Beijing', T.string().slug())).resolves.toBe('welcome-to-Beijing');
    expect(validate('welcome_to_Beijing', T.string().slug())).resolves.toBe('welcome_to_Beijing');
    expect(validate('welcome to Beijing', T.string().slug())).rejects.toThrow('slug');
  });

  test('url', function () {
    expect(validate('http://www.google.com/', T.string().url())).resolves.toBe('http://www.google.com/');
    expect(
      validate(
        'ftp://ftp.freebsd.org/pub/FreeBSD/releases/ISO-IMAGES/13.0/FreeBSD-13.0-RELEASE-amd64-bootonly.iso',
        T.string().url({ protocols: ['http', 'https'] }, ':x has invalid protocol')
      )
    ).rejects.toThrow('protocol');
  });

  test('trim', function () {
    expect(validate('  hello world !! ', T.string().trim())).resolves.toBe('hello world !!');
  });

  test('match', function () {
    expect(validate('abcdefg', T.string().match(/^\w+$/))).resolves.toBe('abcdefg');
    expect(validate('abcdefg', T.string().match(/^ax\w+$/))).rejects.toThrow('not match');
  });
});
