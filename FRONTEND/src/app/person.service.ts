import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Person } from './person';
import { PersonApiDto } from './person-api.dto';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly apiUrl = 'http://localhost:8080/api/persons';

  constructor(private http: HttpClient) {}
  private fromApi(dto: PersonApiDto): Person {
    return {
      id: dto.id,
      firstName: dto.firstName,
      familyName: dto.familyName,
      age: dto.age,
      address: {
        city: dto.city,
        street: dto.street,
        postCode: dto.postCode,
      },
    };
  }
  private toApi(person: Person): PersonApiDto {
    return {
      id: person.id,
      firstName: person.firstName,
      familyName: person.familyName,
      age: person.age,
      city: person.address?.city,
      street: person.address?.street,
      postCode: person.address?.postCode,
    };
  }

  getAll(): Observable<Person[]> {
    return this.http.get<PersonApiDto[]>(this.apiUrl).pipe(
      map((list) => list.map((dto) => this.fromApi(dto)))
    );
  }

  getById(id: number): Observable<Person> {
    return this.http.get<PersonApiDto>(`${this.apiUrl}/${id}`).pipe(
      map((dto) => this.fromApi(dto))
    );
  }

  add(person: Person): Observable<Person> {
    return this.http.post<PersonApiDto>(this.apiUrl, this.toApi(person)).pipe(
      map((dto) => this.fromApi(dto))
    );
  }

  update(id: number, person: Person): Observable<Person> {
    return this.http.put<PersonApiDto>(`${this.apiUrl}/${id}`, this.toApi(person)).pipe(
      map((dto) => this.fromApi(dto))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
