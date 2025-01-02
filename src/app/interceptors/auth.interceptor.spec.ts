import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/AuthService/auth.service';

// Mock AuthService
class MockAuthService {
  getToken(): string | null {
    return null; // Simulate no token scenario
  }
}

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add Authorization header with token', () => {
    // Mock the token to return a valid token
    spyOn(MockAuthService.prototype, 'getToken').and.returnValue('mock-token');

    const testUrl = '/test-url';
    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should not add Authorization header if no token', () => {
    // Mock no token
    spyOn(MockAuthService.prototype, 'getToken').and.returnValue(null); // No token provided

    const testUrl = '/test-url';
    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeFalse(); // No Authorization header
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
