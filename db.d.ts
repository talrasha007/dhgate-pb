
declare namespace PB_DB {
  interface Task {
    app_id: string;
    app_name: string;
    icon_url: string;
    disabled: boolean;

    countries: string[] | string;
    proxy: string;

    send_page_view: boolean;
    use_page_view: boolean;
    page_click: string;
    page_click_rate: number;
    prefix: string;

    click_duration: number;
    click_ratio: number;
    clicks_to_send: number;
    clicks_to_clear: number;

    clicks: TaskItems[] | undefined;
  }

  interface CustomParams {
    deep_link_sub1: string;
    deep_link_sub2: string;
    deep_link_sub3: string;
    deep_link_sub4: string;
    deep_link_sub10: string;
  }

  interface TaskItem {
    id: string;
    disabled: boolean;
    task_id: string;

    deep_link_value: string;
    custom_params: CustomParams | string;

    weight: number;
    page_url: string;
    impact_url: string;
    redirect_until: string;
    item_name: string;
    use_impact_return: boolean;
    use_impact_click: boolean;
  }
}