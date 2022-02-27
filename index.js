//* Variable
var attaFileIdList = [];
var wordsValArr = [], wordsValString = '';
var DicwordsValArr = [], DicwordsValString = '';

jQuery(document).ready(function() {
    authPartial();
    fillFormElement();
    wordsTaginput('WordsTagInput', '#Words');
    wordsTaginput('DictionaryWordsTagInput', '#DictionaryKeyword');
    ProblemRadioWork();
    attachmentFile();
    submitRendReportForm();
});

function authPartial() {
    let user = getCookie('bw-exten-user-claim');
    if (user != undefined) {
        user = JSON.parse(user);
        $("#OrganizationId").val(user.orgID);
        $("#UserId").val(user.userID);
        googleAnalytics(user.userName, user.orgID, user.role);
    }
    else {
        $("#ClaimModal").modal("show");

        $("#claimLoginForm").submit(function (e) {
            e.preventDefault();

            $.ajax({
                cache: false,
                url: HOST_URL + '/_SendReportLogin',
                type: "POST",
                data: $(this).serialize(),
                beforeSend: function () {

                },
                success: function (res) {
                    if (res != null) {
                        $("#ClaimModal").modal("hide");
                        $("#OrganizationId").val(res.OrganizationId);
                        $("#UserId").val(res.Id);

                        googleAnalytics(res.Username, res.OrganizationId, res.Role);

                        setCookie('bw-exten-user-claim', res.OrganizationId, res.Id, res.Username, res.Role)
                    }
                    else {
                        $('#notauthenticate').empty().append('<label class="text-danger font-weight-semibold">Wrong email or password !</label>');
                        $('#Email').val('');
                        $('#PasswordHash').val('');
                    }
                }
            });
        });
    }

}

function googleAnalytics(UName, OrgID, role) {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        var userId = UName + " (" + role + ") - " + OrgID + " Organization";

        ga('create', 'UA-190127990-1', 'auto');
        ga('set', 'userId', userId);
        ga('send', 'event', userId, "Browser Extension - Send Report");
        ga('send', 'pageview');
}

function wordsTaginput(tagInput, id) {
    var input = document.getElementById(tagInput);
    var tagify = new Tagify(input, {
        pattern: /^.{0,20}$/, // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
        delimiters: ", ", // add new tags when a comma or a space character is entered
        maxTags: 6,
        blacklist: ["fuck", "shit", "pussy"],
        keepInvalidTags: true, // do not remove invalid tags (but keep them marked as invalid)
        whitelist: ["temple", "stun", "detective", "sign", "passion", "routine", "deck", "discriminate", "relaxation", "fraud", "attractive", "soft", "forecast", "point", "thank", "stage", "eliminate", "effective", "flood", "passive", "skilled", "separation", "contact", "compromise", "reality", "district", "nationalist", "leg", "porter", "conviction", "worker", "vegetable", "commerce", "conception", "particle", "honor", "stick", "tail", "pumpkin", "core", "mouse", "egg", "population", "unique", "behavior", "onion", "disaster", "cute", "pipe", "sock", "dialect", "horse", "swear", "owner", "cope", "global", "improvement", "artist", "shed", "constant", "bond", "brink", "shower", "spot", "inject", "bowel", "homosexual", "trust", "exclude", "tough", "sickness", "prevalence", "sister", "resolution", "cattle", "cultural", "innocent", "burial", "bundle", "thaw", "respectable", "thirsty", "exposure", "team", "creed", "facade", "calendar", "filter", "utter", "dominate", "predator", "discover", "theorist", "hospitality", "damage", "woman", "rub", "crop", "unpleasant", "halt", "inch", "birthday", "lack", "throne", "maximum", "pause", "digress", "fossil", "policy", "instrument", "trunk", "frame", "measure", "hall", "support", "convenience", "house", "partnership", "inspector", "looting", "ranch", "asset", "rally", "explicit", "leak", "monarch", "ethics", "applied", "aviation", "dentist", "great", "ethnic", "sodium", "truth", "constellation", "lease", "guide", "break", "conclusion", "button", "recording", "horizon", "council", "paradox", "bride", "weigh", "like", "noble", "transition", "accumulation", "arrow", "stitch", "academy", "glimpse", "case", "researcher", "constitutional", "notion", "bathroom", "revolutionary", "soldier", "vehicle", "betray", "gear", "pan", "quarter", "embarrassment", "golf", "shark", "constitution", "club", "college", "duty", "eaux", "know", "collection", "burst", "fun", "animal", "expectation", "persist", "insure", "tick", "account", "initiative", "tourist", "member", "example", "plant", "river", "ratio", "view", "coast", "latest", "invite", "help", "falsify", "allocation", "degree", "feel", "resort", "means", "excuse", "injury", "pupil", "shaft", "allow", "ton", "tube", "dress", "speaker", "double", "theater", "opposed", "holiday", "screw", "cutting", "picture", "laborer", "conservation", "kneel", "miracle", "primary", "nomination", "characteristic", "referral", "carbon", "valley", "hot", "climb", "wrestle", "motorist", "update", "loot", "mosquito", "delivery", "eagle", "guideline", "hurt", "feedback", "finish", "traffic", "competence", "serve", "archive", "feeling", "hope", "seal", "ear", "oven", "vote", "ballot", "study", "negative", "declaration", "particular", "pattern", "suburb", "intervention", "brake", "frequency", "drink", "affair", "contemporary", "prince", "dry", "mole", "lazy", "undermine", "radio", "legislation", "circumstance", "bear", "left", "pony", "industry", "mastermind", "criticism", "sheep", "failure", "chain", "depressed", "launch", "script", "green", "weave", "please", "surprise", "doctor", "revive", "banquet", "belong", "correction", "door", "image", "integrity", "intermediate", "sense", "formal", "cane", "gloom", "toast", "pension", "exception", "prey", "random", "nose", "predict", "needle", "satisfaction", "establish", "fit", "vigorous", "urgency", "X-ray", "equinox", "variety", "proclaim", "conceive", "bulb", "vegetarian", "available", "stake", "publicity", "strikebreaker", "portrait", "sink", "frog", "ruin", "studio", "match", "electron", "captain", "channel", "navy", "set", "recommend", "appoint", "liberal", "missile", "sample", "result", "poor", "efflux", "glance", "timetable", "advertise", "personality", "aunt", "dog"],
        transformTag: transformTag,
        dropdown: {
            enabled: 3,
        }
    });

    function transformTag(tagData) {
        if (id == '#DictionaryKeyword') {
            DicwordsValArr.push(tagData.value);
            if (DicwordsValArr != null) {
                DicwordsValString = DicwordsValArr.join(',');
                $(id).empty().val(DicwordsValString);

                // Set to Cookie
                createFormElementObj('DictionaryKeyword', DicwordsValString);
            }
        }
        else {
            wordsValArr.push(tagData.value);
            if (wordsValArr != null) {
                wordsValString = wordsValArr.join(',');
                $(id).empty().val(wordsValString);

                // Set to Cookie
                createFormElementObj('Words', wordsValString);
            }
        }
    }

    tagify.on('add', function (e) {
        //console.log(e.detail)
    });

    tagify.on('remove', function (e) {
        let id_tag = tagify.DOM.originalInput.id;
        let afterRemovetagVal = tagify.value.map(({ value }) => value).toString();
        if (id_tag == 'DictionaryWordsTagInput') {
            // Set to Cookie
            createFormElementObj('DictionaryKeyword', afterRemovetagVal);
        }
        else {
            // Set to Cookie
            createFormElementObj('Words', afterRemovetagVal);
        }
    });

    tagify.on('invalid', function (e) {
        //console.log(e, e.detail);
    });
}

function ProblemRadioWork() {
    $("input[type='radio'][name=Problem]").click(function () {
        var radioValue = $("input[name='Problem']:checked").val();
        if (radioValue == "Other Threats" || (radioValue != "Analysis / Background Info" && radioValue != "Edge Case"
        && radioValue != "Dangerous Speech" && radioValue != "Threats of Violence"
        && radioValue != "False News" && radioValue != "Compromised Account"))
        {
            $("#otherthreats").removeAttr("hidden");
        }
        else {
            $("#otherthreats").attr("hidden", true);
        }
    });
}

function attachmentFile() {
    $(".input-file-attach").on("change", function () {
        var fileData = new FormData();
        var files = $("#customFile").get(0).files;
        var fileLength = files.length;
        var maxFileSize = 50000000; // 50 MB
        for (var i = 0; i < fileLength; i++) {
            fileData.append(files[i].name, files[i]);
        }

        if (files[0].size > maxFileSize) {
            var filedatasize = '';
            var bytes = files[0].size;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
            if (i === 0) filedatasize = bytes + ' ' + sizes[i];
            filedatasize = (bytes / (1024 ** i)).toFixed(1) + ' ' + sizes[i];

            $('#inputfileMaxError').removeAttr("hidden");
            $('#inputfileMaxError').empty().append('File is too big (' + filedatasize + '). Max file size is 50 MB.');
        }
        else {
            $('#inputfileMaxError').attr("hidden", "hidden");

            $.ajax({
                cache: false,
                type: "POST",
                data: fileData,
                processData: false,
                contentType: false,
                url: HOST_URL + '/UploadAttachToBlobAndDbTb',
                beforeSend: function () {
                    $("#showfilename").removeAttr("hidden");
                    $("#loader-upload").append('<div class="mt-3"><span class="spinner spinner-info"> <span class="ml-7 text-info">Uploading ...</span></span></div>');
                },
                success: function (data) {
                    if (data) {
                        attaFileIdList.push(data.Id);
                        var photobaseurl = "https://portalvhdslvb28rs1c3tmc.blob.core.windows.net/hatespeech/Extension/";
                        $("#loader-upload").empty();
                        $("#showfilename").removeAttr("hidden");
                        $("#filenames").append("<div class='row pb-1' id='" + data.Id + "'>" +
                            "<div class='col-9'><a target='_blank' href=" + photobaseurl + data.FileName + ">" + data.FileName + "</a></div>" +
                            "<div class='col-3'><button type='button' onclick='DeleteFile(" + data.Id + ")' class='btn btn-icon btn-outline-danger btn-circle btn-sm' title='Delete this file'>" +
                            "<i class='flaticon2-rubbish-bin'></i></button></div></div>");
                    }
                },
                complete: function () {
                }
            });
        }
    });
}

function submitRendReportForm() {
    $("#ReportForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            cache: false,
            url: HOST_URL + '/postSendReport',
            type: "POST",
            data: $(this).serialize(),
            beforeSend: function () {
                $('.sub-btn').empty().append('<span class="spinner mr-7"></span> Submitting');
                $('.sub-btn').prop("disabled", true);
            },
            success: function (myData) {
                if (myData != '') {
                    if (attaFileIdList != '') {
                        var attafileStr = attaFileIdList.join(' kkt ');
                        $.ajax({
                            cache: false,
                            type: "Post",
                            traditional: true,
                            url: HOST_URL + '/UpdateAttachFile',
                            data: {
                                masterID: myData.Id,
                                attafileIdlist: attafileStr
                            },
                            beforeSend: function () {
                            },
                            success: function (redata) {
                                if (redata == "Success") {
                                }
                            },
                            complete: function () {
                            }
                        });
                    }

                    deleteCookie('bw-exten-form-elemet-obj'); // Delete the form data cookie after form submit Success.

                    Swal.fire("Successfully!", "Successfully!", "success").then(function() {
                        window.location = '/';
                    });
                }
            },
            complete: function () {
                $('.sub-btn').empty().append('<span>Submit</span>');
                $('.sub-btn').prop("disabled", false);
            }
        });
    });
}

function DeleteFile(FileID) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            DeleteFileComfrim(FileID);
        } else if (result.dismiss === "cancel") {
            Swal.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
            )
        }
    });
}

var DeleteFileComfrim = function (FileID) {
    $.ajax({
        cache: false,
        url: HOST_URL + '/DeleteAttachFile',
        data: { Id: FileID },
        beforeSend: function () {
        },
        success: function (myData) {
            if (myData == "Success") {
                $('#' + FileID).remove();
                $('#customFile').val('');
                $('.custom-file-label').empty();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        },
        complete: function () {
            if (attaFileIdList != '') {
                // add now delete Now for attachfile, remove it from 'attaFileIdList'
                attaFileIdList = jQuery.grep(attaFileIdList, function (value) {
                    return value != FileID;
                });
            }
        }
    });
}

function getCookie(cname) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + cname.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(cname, orgID, userID, userName, role) {
      // +1 day from now
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();

    let user = JSON.stringify({orgID: orgID, userID: userID, userName: userName, role: role});

    let updatedCookie = encodeURIComponent(cname) + "=" + encodeURIComponent(user) + "; expires=" + date;
  
    document.cookie = updatedCookie;
}

function keyupEvent(e) {
    var inputID_key = $(e).attr('id');
    var inputID_Val = $('#' + inputID_key).val();

    createFormElementObj(inputID_key, inputID_Val);
}

$('.radioInputElements').change(function () {
    var thisRdr = $(this);
    var thisRdr_Name = thisRdr.attr('name');

    var checkedRdr = $("input[name="+ thisRdr_Name +"]:checked");
    var inputID_key = checkedRdr.attr('name');
    var inputID_Val = checkedRdr.val();

    createFormElementObj(inputID_key, inputID_Val);
});

var Link = '', Problem = '', Words = '', Speaker = '', Country = '', Language = '',
    AccountType = '', Subject = '', SummaryAnalysis = '', DictionaryKeyword = '', PostContent = '';
function createFormElementObj(_key, _val) {
    
    switch (_key) {
        case 'Link': Link = _val; break;
        case 'Problem': Problem = _val; break;
        case 'Words': Words = _val; break;
        case 'Speaker': Speaker = _val; break;
        case 'Country': Country = _val; break;
        case 'Language': Language = _val; break;
        case 'AccountType': AccountType = _val; break;
        case 'Subject': Subject = _val; break;
        case 'SummaryAnalysis': SummaryAnalysis = _val; break;
        case 'DictionaryKeyword': DictionaryKeyword = _val; break;
        case 'PostContent': PostContent = _val; break;
        //default:
        // code block
    }
    // Get from cookie
    var getformElemetObj = {};
    if (getCookie('bw-exten-form-elemet-obj') != undefined) {
        getformElemetObj = JSON.parse(getCookie('bw-exten-form-elemet-obj'));
    }

    let formElemetObj = JSON.stringify({
        Link: (getformElemetObj.Link == undefined || getformElemetObj.Link == '') ? Link : getformElemetObj.Link == Link ? getformElemetObj.Link : Link,
        Problem: (getformElemetObj.Problem == undefined || getformElemetObj.Problem == '') ? Problem : getformElemetObj.Problem == Problem ? getformElemetObj.Problem : Problem,
        Words: (getformElemetObj.Words == undefined || getformElemetObj.Words == '') ? Words : getformElemetObj.Words == Words ? getformElemetObj.Words : Words,
        /*Words: Words,*/
        Speaker: (getformElemetObj.Speaker == undefined || getformElemetObj.Speaker == '') ? Speaker : getformElemetObj.Speaker == Speaker ? getformElemetObj.Speaker : Speaker,
        Country: (getformElemetObj.Country == undefined || getformElemetObj.Country == '') ? Country : getformElemetObj.Country == Country ? getformElemetObj.Country : Country,
        Language: (getformElemetObj.Language == undefined || getformElemetObj.Language == '') ? Language : getformElemetObj.Language == Language ? getformElemetObj.Language : Language,
        AccountType: (getformElemetObj.AccountType == undefined || getformElemetObj.AccountType == '') ? AccountType : getformElemetObj.AccountType == AccountType ? getformElemetObj.AccountType : AccountType,
        Subject: (getformElemetObj.Subject == undefined || getformElemetObj.Subject == '') ? Subject : getformElemetObj.Subject == Subject ? getformElemetObj.Subject : Subject,
        SummaryAnalysis: (getformElemetObj.SummaryAnalysis == undefined || getformElemetObj.SummaryAnalysis == '') ? SummaryAnalysis : getformElemetObj.SummaryAnalysis == SummaryAnalysis ? getformElemetObj.SummaryAnalysis : SummaryAnalysis,
        DictionaryKeyword: (getformElemetObj.DictionaryKeyword == undefined || getformElemetObj.DictionaryKeyword == '') ? DictionaryKeyword : getformElemetObj.DictionaryKeyword == DictionaryKeyword ? getformElemetObj.DictionaryKeyword : DictionaryKeyword,
        /*DictionaryKeyword: DictionaryKeyword,*/
        PostContent: (getformElemetObj.PostContent == undefined || getformElemetObj.PostContent == '') ? PostContent : getformElemetObj.PostContent == PostContent ? getformElemetObj.PostContent : PostContent
    });

    // Set to Cookie
    setCookieFormElemet('bw-exten-form-elemet-obj', formElemetObj);
}

function setCookieFormElemet(cname, feObj) {
    // +1 day from now
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();

    let updatedCookie = encodeURIComponent(cname) + "=" + encodeURIComponent(feObj) + "; expires=" + date;

    document.cookie = updatedCookie;
}

function fillFormElement() {
    let formEleObjData = getCookie('bw-exten-form-elemet-obj');
    if (formEleObjData != undefined) {
        formEleObjData = JSON.parse(formEleObjData);

        // fill UI
        $('#Link').val(formEleObjData.Link);
        $('.radioInputElements').map(function () {
            var thisElemet = $(this).val();

            if (thisElemet == formEleObjData.Problem) {
                $(this).prop("checked", true);
            }
            if (thisElemet == formEleObjData.Speaker) {
                $(this).prop("checked", true);
            }
            if (thisElemet == formEleObjData.Country) {
                $(this).prop("checked", true);
            }
            if (thisElemet == formEleObjData.Language) {
                $(this).prop("checked", true);
            }
            if (thisElemet == formEleObjData.AccountType) {
                $(this).prop("checked", true);
            }
        });
        $('#Subject').val(formEleObjData.Subject);
        $('#SummaryAnalysis').val(formEleObjData.SummaryAnalysis);
        /*$("#Link").val(formEleObjData.Link);*/ //DictionaryKeyword
        $('#PostContent').val(formEleObjData.PostContent);

        $('#WordsTagInput').val(formEleObjData.Words.replace(",", ", "));
        //var Words_tagify = new Tagify('#WordsTagInput');

        $('#DictionaryWordsTagInput').val(formEleObjData.DictionaryKeyword.replace(",", ", "));
        //var Words_tagify = new Tagify('#DictionaryWordsTagInput');

        // fill Data for variable
        Link = formEleObjData.Link, Problem = formEleObjData.Problem, Words = formEleObjData.Words, Speaker = formEleObjData.Speaker;
        Country = formEleObjData.Country, Language = formEleObjData.Language, AccountType = formEleObjData.AccountType, Subject = formEleObjData.Subject;
        SummaryAnalysis = formEleObjData.SummaryAnalysis, DictionaryKeyword = formEleObjData.DictionaryKeyword, PostContent = formEleObjData.PostContent;
    }
}

function deleteCookie(cname) {
    // Just set the expires parameter to a past date, it is deleted.
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
