package com.example.springpaging;

import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class SampleForm {
  @Pattern(regexp = "^[0-9]*$")
  private String code;
}
