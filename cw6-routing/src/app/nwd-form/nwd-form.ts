import { Component, Signal, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { Nwd } from '../models/Nwd';
type NwdModel = {
  a: number;
  b: number;
  method: string;
  nwd: number | null;
}
@Component({
  selector: 'app-nwd-form',
  imports: [FormField],
  templateUrl: './nwd-form.html',
  styleUrl: './nwd-form.css',
})
export class NwdForm {
  result = signal<string | null>(null);
  
handleSubmit($event: SubmitEvent) {
  $event.preventDefault(); // Prevent the default form submission behavior
  const result = this.nwdModel(); // Get the current value of the nwdModel signal
  const a = result.a;
  const b = result.b;
  const method = result.method;
  

  if (method === 'rek') {
    this.result.set(`rekurencyjnie NWD(${a}, ${b}) = ${Nwd.calculateRec(a, b)}`);
  } else if (method === 'iter') {
    this.result.set(`iteracyjnie NWD(${a}, ${b}) = ${Nwd.calculateIter(a, b)}`);
  }
}
  nwdModel = signal<NwdModel>({ a: 0, b: 0, method: 'rek', nwd: null });
  nwdForm = form(this.nwdModel, (schemaPath) => {
    required(schemaPath.a, { message: "a jest wymagane" });
    required(schemaPath.b, { message: "b jest wymagane" });
    required(schemaPath.method, { message: "metoda jest wymagana" });
  })
}
