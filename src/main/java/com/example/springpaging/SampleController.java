package com.example.springpaging;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SampleController {
  @GetMapping
  public String init(
    @ModelAttribute("sampleForm") SampleForm form
  ) {
    return "sample";
  }

  /**
   * ページ全体をかきかえる
   */
  @PostMapping
  public String post(
    @ModelAttribute("sampleForm") SampleForm form,
    Model model
  ) {

    // データを作成
    List<SampleData> dataList = new ArrayList<SampleData>();
    dataList.add(new SampleData(form.getCode()));
    dataList.add(new SampleData("みかん"));
    dataList.add(new SampleData("いちご"));
    model.addAttribute("dataList", dataList);

    System.out.println(form.toString());

    return "sample";
  }

  /**
   * fragment部分だけかきける
   */
  @PostMapping("/search")
  public String post2(
    @ModelAttribute("sampleForm") SampleForm form,
    Model model
  ) {

    // データを作成
    List<SampleData> dataList = new ArrayList<SampleData>();
    dataList.add(new SampleData(form.getCode()));
    dataList.add(new SampleData("みかん"));
    dataList.add(new SampleData("いちご"));
    model.addAttribute("dataList", dataList);

    System.out.println(form.toString());

    return "data";
  }

  /**
   * jsonでうけてjsonを返す
   */
  @PostMapping("/search/json")
  @ResponseBody
  public List<SampleData> post2json(
    @RequestBody @Validated SampleForm form,
    Model model
  ) {

    // データを作成
    List<SampleData> dataList = new ArrayList<SampleData>();
    dataList.add(new SampleData(form.getCode()));
    dataList.add(new SampleData("josn"));
    model.addAttribute("dataList", dataList);

    System.out.println(form.toString());

    return dataList;
  }
}
