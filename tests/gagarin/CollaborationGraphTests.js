
describe('clinical:collaborations - getCollaboratorsGraph()', function () {
  var server = meteor();
  var client = browser(server);

  var collaborationId = null;
  var initializationCompleted = false;

  before(function () {
    server.execute(function () {
      // Collaborations.remove({});
      // Meteor.users.remove({});
      // Studies.remove({});

      // Meteor.call('initializeUsers');
      // Meteor.call('initializeDefaultCollaborations');
      // Meteor.call('initializeSecurityScenarioStudies');

      // ============================================================================
      // INITIALIZE USERS
      var userId = null;
      // crate our administrator

      // crate our administrator
      userId = Accounts.createUser({
        username: 'house',
        password: 'house',
        email: 'house@test.org',
        profile: {
          fullName: 'Gregory House',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/gregory.house.jpg'
        }
      });
      console.info('Account created: ' + userId);

      userId = Accounts.createUser({
        username: 'camron',
        password: 'camron',
        email: 'camron@test.org',
        profile: {
          fullName: 'Test User',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/allison.camron.jpg'
        }
      });
      console.info('Account created: ' + userId);

      // crate our administrator
      userId = Accounts.createUser({
        username: 'foreman',
        password: 'foreman',
        email: 'foreman@test.org',
        profile: {
          fullName: 'Eric Foreman',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/eric.foreman.jpg'
        }
      });
      console.info('Account created: ' + userId);

      // crate our administrator
      userId = Accounts.createUser({
        username: 'wilson',
        password: 'wilson',
        email: 'wilson@test.org',
        profile: {
          fullName: 'James Wilson',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/james.wilson.jpg'
        }
      });
      console.info('Account created: ' + userId);


      // crate our administrator
      userId = Accounts.createUser({
        username: 'kutner',
        password: 'kutner',
        email: 'kutner@test.org',
        profile: {
          fullName: 'Lawrence Kutner',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/lawrence.kutner.jpg'
        }
      });
      console.info('Account created: ' + userId);


      // crate our administrator
      userId = Accounts.createUser({
        username: 'cuddy',
        password: 'cuddy',
        email: 'cuddy@test.org',
        profile: {
          fullName: 'Lisa Cuddy',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/lisa.cuddy.jpg'
        }
      });
      console.info('Account created: ' + userId);


      // crate our administrator
      userId = Accounts.createUser({
        username: 'chase',
        password: 'chase',
        email: 'chase@test.org',
        profile: {
          fullName: 'Robert Chase',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/robert.chase.jpg'
        }
      });
      console.info('Account created: ' + userId);



      // crate our administrator
      userId = Accounts.createUser({
        username: 'thirteen',
        password: 'thirteen',
        email: 'thirteen@test.org',
        profile: {
          fullName: 'Thirteen',
          role: 'Physician',
          avatar: '/packages/clinical_accounts-housemd/housemd/thirteen.jpg'
        }
      });
      console.info('Account created: ' + userId);

      // ============================================================================
      // INITIALIZE COLLABORATIONS

      Collaborations.insert({
        _id: "ckcc",
        isUnlisted: false,
        name: "California Kids Cancer Comparison",
        description: "",
        collaborators: ["thirteen@test.org", "kutner@test.org"],
        administrators: ["thirteen@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      Collaborations.insert({
        _id: "wcdt",
        isUnlisted: false,
        name: "West Coast Dream Team",
        description: "",
        collaborators: ["cuddy@test.org"],
        administrators: ["cuddy@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      Collaborations.insert({
        _id: "ucsc",
        isUnlisted: false,
        name: "UC Santa Cruz",
        description: "",
        collaborators: ["foreman@test.org", "wcdt"],
        administrators: ["foreman@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      Collaborations.insert({
        _id: "genomics",
        isUnlisted: false,
        name: "Cancer Genomics",
        description: "",
        collaborators: ["kutner@test.org", "chase@test.org", "ucsc"],
        administrators: ["kutner@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      Collaborations.insert({
        _id: "ucsf",
        isUnlisted: false,
        name: "UC San Francisco",
        description: "",
        collaborators: ["camron@test.org", "house@test.org", "wcdt"],
        administrators: ["house@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      Collaborations.insert({
        _id: "ucla",
        isUnlisted: false,
        name: "UC Los Angeles Francisco",
        description: "",
        collaborators: ["wilson@test.org", "wcdt"],
        administrators: ["wilson@test.org"],
        invitations: [],
        requests: [],
        requiresAdministratorApprovalToJoin: false
      });

      // ============================================================================
      // INITIALIZE STUDIES

      var Studies = new Mongo.Collection('studies');

      Studies.upsert({
        _id: "neuroblastoma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Nifty Neuroblastoma Study",
          "short_name": "neuroblastoma",
          "description": "Nifty Neuroblastoma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["ckcc"],
          "tables": [],
          "Questionnaires": [
            "Patient_Enrollment_form",
            "RNASeq_completion_form",
            "Followup"
          ]
        }
      });
      Studies.upsert({
        _id: "lymphoma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Lazy Lymphoma Study",
          "short_name": "lymphoma",
          "description": "Lazy Lymphoma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["ucsf"],
          "tables": [],
          "Questionnaires": [
            "Demographics",
            "Followup"
          ]
        }
      });
      Studies.upsert({
        _id: "granuloma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Grumpy Granuloma Study",
          "short_name": "granuloma",
          "description": "Grumpy Granuloma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["ucsf"],
          "tables": [],
          "Questionnaires": [
            "Patient_Enrollment_form",
            "Blood_Labs_V2",
            "Followup"
          ]
        }
      });


      Studies.upsert({
        _id: "carcinoma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Cranky Carcinoma Study",
          "short_name": "carcinoma",
          "description": "Cranky Carcinoma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["genomics"],
          "tables": [],
          "Questionnaires": [
            "RNASeq_completion_form",
            "Followup"
          ]
        }
      });
      Studies.upsert({
        _id: "melanoma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Meloncholy Melanoma Study",
          "short_name": "melanoma",
          "description": "Meloncholy Melanoma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["ucla"],
          "tables": [],
          "Questionnaires": [
            "RNASeq_completion_form",
            "Followup"
          ]
        }
      });
      Studies.upsert({
        _id: "sarcoma"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Sappy Sarcoma Study",
          "short_name": "sarcoma",
          "description": "Sappy Sarcoma Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["ucsc"],
          "tables": [],
          "Questionnaires": [
            "Laser_Capture_Microdissection",
            "Followup"
          ]
        }
      });

      Studies.upsert({
        _id: "satisfaction"
      }, {
        $set: {
          "cbio_id": "112",
          "name": "Patient Satisfaction Study",
          "short_name": "satisfaction",
          "description": "Patient Satisfaction Study",
          "public": false,
          "citation": "unpublished",
          "collaborations": ["wcdt"],
          "tables": [],
          "Questionnaires": [
            "Patient_Satisfaction"
          ]
        }
      });
      return true;
    }).then(function (value){
      initializationCompleted = value;
    });
  });

  after(function () {
    server.execute(function () {
      Collaborations.remove({});
      Meteor.users.remove({});
      Studies.remove({});
      initializationCompleted = false;
    });
  });


  it('Confirm house exists', function () {
    return server.execute(function () {
      return Meteor.users.findOne({username: 'house'});
    }).then(function (user){
      expect(user).to.exist;
      expect(user.username).to.equal('house');
    });
  });

  it('Should exist on the client', function () {
    return client.execute(function () {
      expect(Collaborations).not.to.be.empty;
    });
  });

  it('Should exist on the server', function () {
    return server.execute(function () {
      expect(Collaborations).not.to.be.empty;
    });
  });

  it('Confirm House MD acount is initialized', function () {
    return server.wait(1000, "until users are loaded", function () {
      return Meteor.users.findOne({username: "house"});
    }).then(function (user){
      expect(user.username).to.equal("house");
    });
  });
  it('Confirm CKCC collaboration exists', function () {
    return client.execute(function () {
      var collaboration = Collaborations.findOne({_id: 'ckcc'});
      expect(collaboration).not.to.be.empty;
      expect(collaboration._id).to.equal('ckcc');
      expect(collaboration.name).to.equal('California Kids Cancer Comparison');
    });
  });

  it('Confirm users are initialized', function () {
    return server.wait(1000, "until users are loaded", function () {
      return Meteor.users.find().fetch();
    }).then(function (users){
      expect(users.length).to.equal(8);
    });
  });
  it('Confirm collaborations are initialized', function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
    // return server.execute(function (){
      return Collaborations.find().fetch();
    }).then(function (collaborations){
      expect(collaborations.length).to.equal(6);
    });
  });


  it("Collaboration.getCollaborators()", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucsc'}).getCollaborators();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(2);
    });
  });
  it("Collaboration.getCollaboratorsGraph() - WCDT collaboration contains Cuddy", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'wcdt'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(1);

      // expected collaborators
      expect(collaborators).to.include("cuddy@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("foreman@test.org");
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("kutner@test.org");
      expect(collaborators).to.not.include("house@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("camron@test.org");
    });
  });
  it("Collaboration.getCollaboratorsGraph() - UCSC collaboration contains Foreman and Cuddy", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucsc'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(2);

      // expected collaborators
      expect(collaborators).to.include("foreman@test.org");
      expect(collaborators).to.include("cuddy@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("kutner@test.org");
      expect(collaborators).to.not.include("house@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("camron@test.org");
    });
  });
  it("Collaboration.getCollaboratorsGraph() - Cancer Genomics collaboration contains Kutner, Chase, Foreman, and Cuddy", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'genomics'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(4);

      // expected collaborators
      expect(collaborators).to.include("chase@test.org");
      expect(collaborators).to.include("kutner@test.org");
      expect(collaborators).to.include("foreman@test.org");
      expect(collaborators).to.include("cuddy@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("house@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("camron@test.org");
    });
  });
  it("Collaboration.getCollaboratorsGraph() - CKCC collaboration contains Thirteen and Kutner", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ckcc'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(2);

      // expected collaborators
      expect(collaborators).to.include("thirteen@test.org");
      expect(collaborators).to.include("kutner@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("cuddy@test.org");
      expect(collaborators).to.not.include("foreman@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("house@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("camron@test.org");
    });
  });
  it("Collaboration.getCollaboratorsGraph() - UCLA collaboration contains Wilson and Cuddy", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucla'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(2);

      // expected collaborators
      expect(collaborators).to.include("cuddy@test.org");
      expect(collaborators).to.include("wilson@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("foreman@test.org");
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("kutner@test.org");
      expect(collaborators).to.not.include("house@test.org");
      expect(collaborators).to.not.include("camron@test.org");
    });
  });
  it("Collaboration.getCollaboratorsGraph() - UCSF collaboration contains Camron, House, and Cuddy", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucsf'}).getCollaboratorsGraph();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(3);

      // expected collaborators
      expect(collaborators).to.include("cuddy@test.org");
      expect(collaborators).to.include("house@test.org");
      expect(collaborators).to.include("camron@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("foreman@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("kutner@test.org");
    });
  });
  it("Collaboration.getAssociatedCollaborators() - UCSF has associative collaboration with WCDT ", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucsf'}).getAssociatedCollaborators();
    }).then(function (collaborators){
      expect(collaborators.length).to.equal(3);

      // expected collaborators
      expect(collaborators).to.include("cuddy@test.org");
      expect(collaborators).to.include("house@test.org");
      expect(collaborators).to.include("camron@test.org");

      // denied collaborators
      expect(collaborators).to.not.include("foreman@test.org");
      expect(collaborators).to.not.include("wilson@test.org");
      expect(collaborators).to.not.include("thirteen@test.org");
      expect(collaborators).to.not.include("chase@test.org");
      expect(collaborators).to.not.include("kutner@test.org");
    });
  });
  it("Collaboration.getAssociatedCollaborations() - UCSF has associative collaboration with WCDT ", function () {
    return server.wait(1000, 'until collaborations collection is available on server', function (){
      return Collaborations.findOne({_id: 'ucsf'}).getAssociatedCollaborations();
    }).then(function (collaborations){
      expect(collaborations.length).to.equal(1);

      // expected collaborators
      expect(collaborations).to.include("wcdt");

      // denied collaborators
      expect(collaborations).to.not.include("ckcc");
      expect(collaborations).to.not.include("ucla");
      expect(collaborations).to.not.include("ucsc");
      expect(collaborations).to.not.include("ucsf");
      expect(collaborations).to.not.include("genomics");
    });
  });

  //------------------------------------------------------------------------
  // Camron should have access to:
  //   Studies
  //     Granuloma Study
  //     Lymphoma Study
  //     Patient Satisfaction
  //   Questionnaires
  //     Lymphoma Followup
  //     Lymphoma Demographics
  //     Granuloma Patient Intake
  //     Granuloma Blood Labs
  //     Granuloma Followup
  //     Patient Satisfaction

  it('User.getCollaborations() - Camron belongs to the "ucsf" and "camron" collaborations.', function () {
    return server.wait(500, "until users is found", function () {
      return Meteor.users.findOne({username: "camron"}).getCollaborations();
    }).then(function (collaborations){

      // expected collaborations
      expect(collaborations).to.include("ucsf");
      expect(collaborations).to.include("camron");

      // denied collaborations
      expect(collaborations).to.not.include("wcdt");
      expect(collaborations).to.not.include("ckcc");
      expect(collaborations).to.not.include("ucla");
      expect(collaborations).to.not.include("ucsc");
      expect(collaborations).to.not.include("genomics");

    });
  });

  it('User.getAssociatedCollaborations() - Camron has associative access to the WCDT collaborations.', function () {
    return server.wait(500, "until users is found", function () {
      return Meteor.users.findOne({username: "camron"}).getAssociatedCollaborations();
    }).then(function (collaborations){

      // expected collaborations
      expect(collaborations).to.include("wcdt");
      expect(collaborations).to.include("ucsf");
      expect(collaborations).to.include("camron");

      // denied collaborations
      expect(collaborations).to.not.include("ckcc");
      expect(collaborations).to.not.include("ucla");
      expect(collaborations).to.not.include("ucsc");
      expect(collaborations).to.not.include("genomics");
    });
  });

  // it('User.getCollaborationStudies() - Camron has access to UCSF and WCDT studies.', function () {
  //   return server.wait(500, "until users is found", function () {
  //     return Meteor.users.findOne({username: "camron"}).getCollaborationStudies();
  //   }).then(function (studies){
  //     // expected studies
  //     expect(studies).to.include("lymphoma");
  //     expect(studies).to.include("granuloma");
  //     expect(studies).to.include("satisfaction");
  //
  //     // denied studies
  //     expect(studies).to.not.include("neuroblastoma");
  //     expect(studies).to.not.include("melanoma");
  //     expect(studies).to.not.include("sarcoma");
  //     expect(studies).to.not.include("carcinoma");
  //   });
  // });
  // it('User.getCollaborationQuestionnaires() - Camron has access to UCSF and WCDT questionnaires.', function () {
  //   return server.wait(500, "until users is found", function () {
  //     return Meteor.users.findOne({username: "camron"});
  //   }).then(function (user){
  //     user = new User(user);
  //
  //     var studies = user.getCollaborationStudies();
  //     var questionnaires = [];
  //     studies.forEach(function (study){
  //       questionnaires.push(study.getQuestionnaires());
  //     });
  //     // expected questionnaires
  //     expect(questionnaires).to.include("Followup");
  //     expect(questionnaires).to.include("Demographics");
  //     expect(questionnaires).to.include("Patient_Enrollment_form");
  //     expect(questionnaires).to.include("Blood_Labs_V2");
  //     expect(questionnaires).to.include("Patient_Satisfaction");
  //
  //     // denied questionnaires
  //     expect(questionnaires).to.include("Followup");
  //     expect(questionnaires).to.include("Demographics");
  //     expect(questionnaires).to.include("Patient_Enrollment_form");
  //     expect(questionnaires).to.include("Blood_Labs_V2");
  //     expect(questionnaires).to.include("Patient_Satisfaction");
  //   });
  // });





  // it("Other collections can use Collaborations.getCollaborationGraph() in their publication functions.", function () {
  //   return client.execute(function () {
  //     expect(false).to.be.true;
  //   });
  // });

  // //==================================================
  // // COLLABORATION GRAPH TESTS
  //
  // Kutner should have access to:
  //   Studies
  //     Carcinoma Study
  //     Sarcoma Study
  //     Neuroblastoma Study
  //     Patient Satisfaction
  //   Questionnaires
  //     Carcinoma Followup
  //     Carcinoma RNA Seq
  //     Sarcoma Followup
  //     Sarcoma Laser Disection
  //     Neuroblastoma Intake
  //     Neuroblastoma RNA Seq
  //     Neuroblatoma Followup
  //     Patient Satisfaction
  //
  // Thirteen should have access to:
  //   Studies
  //     Neuroblastoma Study
  //   Questionnaires
  //     Neuroblastoma Intake
  //     Neuroblastoma RNA Seq
  //     Neuroblatoma Followup
  //
  // Cuddy should have access to:
  //   Studies
  //     Patient Satisfaction
  //   Questionnaires
  //     Patient Satisfaction
  //
  // Wilson should have access to:
  //   Studies
  //     Melanoma Study
  //     Patient Satisfaction
  //   Questionnaires
  //     Melanoma RNA Seq
  //     Melanoma Followup
  //     Patient Satisfaction
  //
  // Foreman should have access to:
  //   Studies
  //     Sarcoma Study
  //     Patient Satisfaction
  //   Questionnaires
  //     Sarcoma Laser Dissection
  //     Sarcoma Followup
  //     Patient Satisfaction
  //
  // Chase should have access to:
  //   Studies
  //     Carcinoma Followup
  //     Carcinoma RNA Seq
  //     Sarcoma Laser Dissection
  //     Sarcoma Followup
  //     Patient Satisfaction
  //   Questionnaires
  //     Carcinoma Study
  //     Sarcoma Study
  //     Patient Satisfaction
  //

  // House should have access to:
  //   Studies
  //     Granuloma Study
  //     Lymphoma Study
  //     Patient Satisfaction
  //   Questionnaires
  //     Lymphoma Followup
  //     Lymphoma Demographics
  //     Granuloma Patient Intake
  //     Granuloma Blood Labs
  //     Granuloma Followup
  //     Patient Satisfaction


});
