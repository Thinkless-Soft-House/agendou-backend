export const bookingCompanyTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- So that mobile will display zoomed in -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- enable media queries for windows phone 8 -->
    <meta name="format-detection" content="telephone=no" />
    <!-- disable auto telephone linking in iOS -->
    <meta name="format-detection" content="date=no" />
    <!-- disable auto date linking in iOS -->
    <meta name="format-detection" content="address=no" />
    <!-- disable auto address linking in iOS -->
    <meta name="format-detection" content="email=no" />
    <!-- disable auto email linking in iOS -->
    <meta name="color-scheme" content="only" />
    <title></title>

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />

    <style type="text/css">
      /*Basics*/
      body {
        margin: 0px !important;
        padding: 0px !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        -webkit-text-size-adjust: none;
      }
      table {
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      table td {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
      td img {
        -ms-interpolation-mode: bicubic;
        width: auto;
        max-width: auto;
        height: auto;
        margin: auto;
        display: block !important;
        border: 0px;
      }
      td p {
        margin: 0;
        padding: 0;
      }
      td div {
        margin: 0;
        padding: 0;
      }
      td a {
        text-decoration: none;
        color: inherit;
      }
      /*Outlook*/
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: inherit;
      }
      .ReadMsgBody {
        width: 100%;
        background-color: #ffffff;
      }
      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      /*Gmail blue links*/
      u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      /*Buttons fix*/
      .undoreset a,
      .undoreset a:hover {
        text-decoration: none !important;
      }
      .yshortcuts a {
        border-bottom: none !important;
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: none;
      }
      /*Responsive*/
      @media screen and (max-width: 639px) {
        table.row {
          width: 100% !important;
          max-width: 100% !important;
        }
        td.row {
          width: 100% !important;
          max-width: 100% !important;
        }
        .img-responsive img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto;
        }
        .center-float {
          float: none !important;
          margin: auto !important;
        }
        .center-text {
          text-align: center !important;
        }
        .container-padding {
          width: 100% !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        .container-padding10 {
          width: 100% !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
        .container-padding25 {
          width: 100% !important;
          padding-left: 25px !important;
          padding-right: 25px !important;
        }
        .hide-mobile {
          display: none !important;
        }
        .menu-container {
          text-align: center !important;
        }
        .autoheight {
          height: auto !important;
        }
        .m-padding-10 {
          margin: 10px 0 !important;
        }
        .m-padding-15 {
          margin: 15px 0 !important;
        }
        .m-padding-20 {
          margin: 20px 0 !important;
        }
        .m-padding-30 {
          margin: 30px 0 !important;
        }
        .m-padding-40 {
          margin: 40px 0 !important;
        }
        .m-padding-50 {
          margin: 50px 0 !important;
        }
        .m-padding-60 {
          margin: 60px 0 !important;
        }
        .m-padding-top10 {
          margin: 30px 0 0 0 !important;
        }
        .m-padding-top15 {
          margin: 15px 0 0 0 !important;
        }
        .m-padding-top20 {
          margin: 20px 0 0 0 !important;
        }
        .m-padding-top30 {
          margin: 30px 0 0 0 !important;
        }
        .m-padding-top40 {
          margin: 40px 0 0 0 !important;
        }
        .m-padding-top50 {
          margin: 50px 0 0 0 !important;
        }
        .m-padding-top60 {
          margin: 60px 0 0 0 !important;
        }
        .m-height10 {
          font-size: 10px !important;
          line-height: 10px !important;
          height: 10px !important;
        }
        .m-height15 {
          font-size: 15px !important;
          line-height: 15px !important;
          height: 15px !important;
        }
        .m-height20 {
          font-size: 20px !important;
          line-height: 20px !important;
          height: 20px !important;
        }
        .m-height25 {
          font-size: 25px !important;
          line-height: 25px !important;
          height: 25px !important;
        }
        .m-height30 {
          font-size: 30px !important;
          line-height: 30px !important;
          height: 30px !important;
        }
        .rwd-on-mobile {
          display: inline-block !important;
          padding: 5px !important;
        }
        .center-on-mobile {
          text-align: center !important;
        }
      }
    </style>
  </head>

  <body
    Simpli
    style="
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
      width: 100%;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    "
    bgcolor="#F0F0F0"
  >
    <span
      class="preheader-text"
      Simpli
      style="
        color: transparent;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        visibility: hidden;
        width: 0;
        display: none;
        mso-hide: all;
      "
    ></span>

    <div
      style="
        display: none;
        font-size: 0px;
        line-height: 0px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
        visibility: hidden;
        mso-hide: all;
      "
    ></div>

    <table
      border="0"
      align="center"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="width: 100%; max-width: 100%"
    >
      <tr>
        <!-- Outer Table -->
        <td align="center" Simpli bgcolor="#F0F0F0" data-composer>
          <table
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
            class="row"
            role="presentation"
            width="640"
            style="width: 640px; max-width: 640px"
            Simpli
          >
            <!-- simpli-header-5 -->
            <tr>
              <td align="center">
                <table
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  class="row container-padding25"
                  width="600"
                  style="width: 600px; max-width: 600px; margin-top: 20px"
                >
                  <!-- basic-info -->
                  <tr>
                    <td
                      align="center"
                      Simpli
                      bgcolor="#FFFFFF"
                      style="
                        border-radius: 0 0 36px 36px;
                        border-bottom: solid 6px #dddddd;
                      "
                    >
                      <!-- content -->
                      <table
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        class="row container-padding"
                        width="520"
                        style="width: 520px; max-width: 520px"
                      >
                        <tr>
                          <td
                            class="center-text"
                            Simpli
                            align="center"
                            style="
                              font-family: 'Catamaran', Arial, Helvetica,
                                sans-serif;
                              font-size: 12px;
                              line-height: 24px;
                              font-weight: 900;
                              font-style: normal;
                              color: #1898c2;
                              text-decoration: none;
                              letter-spacing: 2px;
                            "
                          >
                            <singleline>
                              <div mc:edit Simpli>Visita agendada!</div>
                            </singleline>
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="center-text"
                            Simpli
                            align="center"
                            style="
                              font-family: 'Catamaran', Arial, Helvetica,
                                sans-serif;
                              font-size: 48px;
                              line-height: 54px;
                              font-weight: 700;
                              font-style: normal;
                              color: #333333;
                              text-decoration: none;
                              letter-spacing: 0px;
                            "
                          >
                            <singleline>
                              <div mc:edit Simpli>Uma visita foi agendada na sua empresa!</div>
                            </singleline>
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="15"
                            style="font-size: 15px; line-height: 15px"
                            Simpli
                          >
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="center-text"
                            Simpli
                            align="center"
                            style="
                              font-family: 'Catamaran', Arial, Helvetica,
                                sans-serif;
                              font-size: 16px;
                              line-height: 26px;
                              font-weight: 300;
                              font-style: normal;
                              color: #333333;
                              text-decoration: none;
                              letter-spacing: 0px;
                            "
                          >
                            <singleline>
                              <div mc:edit Simpli>
                                Abaixo seguem os dados da visita do cliente {{CLIENTE}}
                              </div>
                            </singleline>
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="25"
                            style="font-size: 25px; line-height: 25px"
                            Simpli
                          >
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <!-- Use Code -->
                            <table
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              role="presentation"
                              align="center"
                              class="row"
                              width="480"
                              style="width: 480px; max-width: 480px"
                            >
                              <tr>
                                <td
                                  align="center"
                                  Simpli
                                  bgcolor="#FAFAFA"
                                  style="
                                    border-radius: 10px;
                                    border: 2px dotted #dddddd;
                                  "
                                >
                                  <!-- Content -->
                                  <table
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    align="center"
                                    class="row"
                                    width="480"
                                    style="width: 480px; max-width: 480px"
                                  >
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                        "
                                      >
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="center-text"
                                        Simpli
                                        align="start"
                                        style="
                                          font-family: 'Catamaran', Arial,
                                            Helvetica, sans-serif;
                                          font-size: 22px;
                                          line-height: 26px;
                                          font-weight: 700;
                                          font-style: normal;
                                          color: #333333;
                                          text-decoration: none;
                                          letter-spacing: 0px;
                                        "
                                      >
                                        <singleline>
                                          <div mc:edit Simpli style="margin-left: 20px">
                                            Cliente: {{CLIENTE}} <br>
                                            Email do Cliente: {{EMAIL_CLIENTE}} <br>
                                            Sala: {{SALA}} <br>
                                            Dia: {{DIA}} <br>
                                            Horário: {{HORARIO}} <br>
                                          </div>
                                        </singleline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                        "
                                      >
                                        &nbsp;
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- Content -->
                                </td>
                              </tr>
                            </table>
                            <!-- User Code -->
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="30"
                            style="font-size: 30px; line-height: 30px"
                            Simpli
                          >
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <!-- Button -->
                            <table
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              role="presentation"
                              align="center"
                              class="center-float"
                            >
                              <tr>
                                <td
                                  align="center"
                                  Simpli
                                  bgcolor="#ff7775"
                                  style="border-radius: 6px"
                                >
                                  <!--[if (gte mso 9)|(IE)]>
              <table border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td align="center" width="35"></td>
                  <td align="center" height="50" style="height:50px;">
                  <![endif]-->
                                  <!-- <singleline>
                                    <a
                                      href="#"
                                      target="_blank"
                                      mc:edit
                                      style="
                                        font-family: 'Catamaran', Arial,
                                          Helvetica, sans-serif;
                                        font-size: 16px;
                                        line-height: 20px;
                                        font-weight: 700;
                                        font-style: normal;
                                        color: #ffffff;
                                        text-decoration: none;
                                        letter-spacing: 0px;
                                        padding: 15px 35px 15px 35px;
                                        display: inline-block;
                                      "
                                      ><span>ACTIVATE CODE</span></a
                                    >
                                  </singleline> -->
                                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  <td align="center" width="35"></td>
                </tr>
              </table>
            <![endif]-->
                                </td>
                              </tr>
                            </table>
                            <!-- Buttons -->
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="40"
                            style="font-size: 40px; line-height: 40px"
                            Simpli
                          >
                            &nbsp;
                          </td>
                        </tr>
                      </table>
                      <!-- content -->
                    </td>
                  </tr>
                  <!-- basic-info -->
                </table>
              </td>
            </tr>
            <!-- simpli-header-5 -->
          </table>

          <table
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            width="100%"
            style="width: 100%; max-width: 100%"
            Simpli
          >
            <!-- simpli-footer -->
            <tr>
              <td align="center">
                <!-- Content -->
                <table
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  class="row container-padding"
                  width="520"
                  style="width: 520px; max-width: 520px"
                >
                  <tr>
                    <td
                      height="50"
                      style="font-size: 50px; line-height: 50px"
                      Simpli
                    >
                      &nbsp;
                    </td>
                  </tr>

                  <tr>
                    <td align="center">
                      <table
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        class="row"
                        width="480"
                        style="width: 480px; max-width: 480px"
                      >
                        <tr>
                          <td
                            class="center-text"
                            Simpli
                            align="center"
                            style="
                              font-family: 'Catamaran', Arial, Helvetica,
                                sans-serif;
                              font-size: 16px;
                              line-height: 24px;
                              font-weight: 480;
                              font-style: normal;
                              color: #666666;
                              text-decoration: none;
                              letter-spacing: 0px;
                            "
                          >
                            <multiline>
                              <div mc:edit Simpli>
                                O App Collegato está disponivel em Android e IOS
                              </div>
                            </multiline>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="15"
                      style="font-size: 15px; line-height: 15px"
                      Simpli
                    >
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <!-- Buttons -->
                      <table
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        class="row"
                        width="100%"
                        style="width: 100%; max-width: 100%"
                      >
                        <tr>
                          <td align="center">
                            <!-- column -->
                            <table
                              border="0"
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tr>
                                <td align="center">
                                  <img
                                    style="
                                      display: block;
                                      width: 100%;
                                      max-width: 117px;
                                      border: 0px;
                                    "
                                    data-image-edit
                                    width="117"
                                    src="https://collegato-app.s3.amazonaws.com/email-templates/code-verification/images/App-Store.png"
                                    border="0"
                                    editable="true"
                                    alt="icon"
                                  />
                                </td>
                                <td width="10" style="width: 10px"></td>
                                <td align="center">
                                  <img
                                    style="
                                      display: block;
                                      width: 100%;
                                      max-width: 117px;
                                      border: 0px;
                                    "
                                    data-image-edit
                                    width="117"
                                    src="https://collegato-app.s3.amazonaws.com/email-templates/code-verification/images/Google-play.png"
                                    border="0"
                                    editable="true"
                                    alt="icon"
                                  />
                                </td>
                              </tr>
                            </table>
                            <!-- column -->
                          </td>
                        </tr>
                      </table>
                      <!-- Buttons -->
                    </td>
                  </tr>

                  <tr>
                    <td
                      height="26"
                      style="
                        border-bottom: 4px dotted #e4e4e4;
                        font-size: 26px;
                        line-height: 26px;
                      "
                    >
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="30"
                      style="font-size: 30px; line-height: 30px"
                      Simpli
                    >
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        class="row"
                        width="480"
                        style="width: 480px; max-width: 480px"
                      >
                        <tr>
                          <td
                            class="center-text"
                            Simpli
                            align="center"
                            style="
                              font-family: 'Catamaran', Arial, Helvetica,
                                sans-serif;
                              font-size: 14px;
                              line-height: 24px;
                              font-weight: 480;
                              font-style: normal;
                              color: #666666;
                              text-decoration: none;
                              letter-spacing: 0px;
                            "
                          >
                            <multiline>
                              <div mc:edit Simpli>
                                2022 Collegato. Todos os direitos reservados<br />
                                <br />
                                Você recebeu esse email por ter se cadastrado no
                                Collegato - Agendamento de salas.
                              </div>
                            </multiline>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="30"
                      style="font-size: 30px; line-height: 30px"
                      Simpli
                    >
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td align="center" class="center-text">
                      <img
                        style="
                          width: 120px;
                          border: 0px;
                          display: inline !important;
                        "
                        src="https://collegato-app.s3.amazonaws.com/email-templates/code-verification/images/logo-footer.png"
                        width="120"
                        border="0"
                        editable="true"
                        Simpli
                        data-image-edit
                        Simpli
                        alt="logo"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      height="50"
                      style="font-size: 50px; line-height: 50px"
                      Simpli
                    >
                      &nbsp;
                    </td>
                  </tr>
                </table>
                <!-- Content -->
              </td>
            </tr>
            <!-- simpli-footer -->
          </table>
        </td>
      </tr>
      <!-- Outer-Table -->
    </table>
  </body>
</html>
`;
