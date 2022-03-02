let DataTypes = require("sequelize").DataTypes;

//let _ClientDetails = require('./ClientDetails');
let _ActorClient = require('./actor_perspective/ActorClient');
let _ContractWorkOrder = require('./process_perspective/ContractWorkOrder');
let _ContractWorkOrderItem = require('./process_perspective/ContractWorkOrderItem');
let _Employee = require('./asset_perspective/Employee');
let _Equipment = require('./asset_perspective/Equipment');
let _ExecutionResource = require('./asset_perspective/ExecutionResource');
let _PartcodeEbom = require('./product_perspective/PartcodeEbom');
let _PartcodeMbom = require('./product_perspective/PartcodeMbom');
let _Product = require('./product_perspective/Product');
let _ProductDetails = require('./product_perspective/ProductDetails');
let _ProductionOrder = require('./process_perspective/ProductionOrder');
let _ProductionPhase = require('./process_perspective/ProductionPhase');
let _ProductionPhaseExecution = require('./process_perspective/ProductionPhaseExecution');
let _PurchaseOrder = require('./process_perspective/PurchaseOrder');
let _PurchaseOrderItem = require('./process_perspective/PurchaseOrderItem');
let _Resource = require('./asset_perspective/Resource');
let _SalesOrder = require('./process_perspective/SalesOrder');
let _SalesOrderItem = require('./process_perspective/SalesOrderItem');
let _Software = require('./asset_perspective/Software');
let _Supply = require('./actor_perspective/Supply');
let _SupplyChainActor = require('./actor_perspective/SupplyChainActor');
let _SupplyChainClient = require('./actor_perspective/SupplyChainClient');
let _Supplyed = require('./actor_perspective/Supplyed');
let _User = require('./actor_perspective/User');
let _UserCategory = require('./actor_perspective/UserCategory');
let _WorkCenter = require('./asset_perspective/WorkCenter');
// tabella utilità
let _VendorService = require('./VendorService');

function initModels(sequelize){
    //let ClientDetails = _ClientDetails(sequelize, DataTypes);
    let ActorClient = _ActorClient(sequelize, DataTypes);
    let ContractWorkOrder = _ContractWorkOrder(sequelize, DataTypes);
    let ContractWorkOrderItem = _ContractWorkOrderItem(sequelize, DataTypes);
    let Employee = _Employee(sequelize, DataTypes);
    let Equipment = _Equipment(sequelize, DataTypes);
    let ExecutionResource = _ExecutionResource(sequelize, DataTypes);
    let PartcodeEbom = _PartcodeEbom(sequelize, DataTypes);
    let PartcodeMbom = _PartcodeMbom(sequelize, DataTypes);
    let Product = _Product(sequelize, DataTypes);
    let ProductDetails = _ProductDetails(sequelize, DataTypes);
    let ProductionOrder = _ProductionOrder(sequelize, DataTypes);
    let ProductionPhase = _ProductionPhase(sequelize, DataTypes);
    let ProductionPhaseExecution = _ProductionPhaseExecution(sequelize, DataTypes);
    let PurchaseOrder = _PurchaseOrder(sequelize, DataTypes);
    let PurchaseOrderItem = _PurchaseOrderItem(sequelize, DataTypes);
    let Resource = _Resource(sequelize, DataTypes);
    let SalesOrder = _SalesOrder(sequelize, DataTypes);
    let SalesOrderItem = _SalesOrderItem(sequelize, DataTypes);
    let Software = _Software(sequelize, DataTypes);
    let Supply = _Supply(sequelize, DataTypes);
    let SupplyChainActor = _SupplyChainActor(sequelize, DataTypes);
    let SupplyChainClient = _SupplyChainClient(sequelize, DataTypes);
    let Supplyed = _Supplyed(sequelize, DataTypes);
    let User = _User(sequelize, DataTypes);
    let UserCategory = _UserCategory(sequelize, DataTypes);
    let WorkCenter = _WorkCenter(sequelize, DataTypes);
    let VendorService = _VendorService(sequelize, DataTypes);

    //SCHEMA ER 2
    //Product.belongsTo(ProductDetails, { foreignKey: "iddeatils"});
    //ProductDetails.hasOne(Product, { foreignKey: "iddeatils"});
    PartcodeEbom.belongsTo(Product, { foreignKey: "idproduct"});
    Product.hasOne(PartcodeEbom, { foreignKey: "idproduct"});

    //Product.belongsTo(PartcodeMbom, { foreignKey: "idmbom"});
    //PartcodeMbom.hasOne(Product, { foreignKey: "idmbom"});
    PartcodeMbom.belongsTo(PartcodeEbom, { foreignKey: "idebom"});
    PartcodeEbom.hasOne(PartcodeMbom, { foreignKey: "idebom"});
    PartcodeEbom.belongsTo(PartcodeEbom, { foreignKey: "idebom"}); //auto dipendenza Ebom
    PartcodeEbom.hasMany(PartcodeEbom, { foreignKey: "idebom"}); //auto dipendenza Ebom
    PartcodeMbom.belongsTo(PartcodeMbom, { foreignKey: "idmbom"}); //auto dipendenza Mbom
    PartcodeMbom.hasMany(PartcodeMbom, { foreignKey: "idmbom"}); //auto dipendenza Mbom
    PurchaseOrder.belongsTo(PartcodeMbom, { foreignKey: "idmbom"});
    PartcodeMbom.hasMany(PurchaseOrder, { foreignKey: "idmbom"});
    ContractWorkOrder.belongsTo(PartcodeMbom, { foreignKey: "idmbom"});
    PartcodeMbom.hasMany(ContractWorkOrder, { foreignKey: "idmbom"});
    PurchaseOrderItem.belongsTo(PurchaseOrder, {foreignKey: "idorder"}); //la foreign key forse è meglio cambiarla in "idpurchaseorder" per motivi di leggibilità
    PurchaseOrder.hasMany(PurchaseOrderItem, {foreignKey: "idorder"});
    ContractWorkOrderItem.belongsTo(ContractWorkOrder, {foreignKey: "idworkorder"});
    ContractWorkOrder.hasMany(ContractWorkOrderItem, {foreignKey: "idworkorder"});
    ProductionOrder.belongsTo(PurchaseOrderItem, {foreignKey: "idpurchaseorder"});
    PurchaseOrderItem.hasMany(ProductionOrder, {foreignKey: "idpurchaseorder"});
    ProductionOrder.belongsTo(ContractWorkOrderItem, {foreignKey: "idworkorder"});
    ContractWorkOrderItem.hasMany(ProductionOrder, {foreignKey: "idworkorder"});
    ProductionOrder.belongsTo(PartcodeMbom, {foreignKey: "idmbom"});
    PartcodeMbom.hasMany(ProductionOrder, {foreignKey: "idmbom"});
    // ProductionPhaseExecution.belongsTo(Resource, {foreignKey: "idresource"});   //dallo schema la dipendenza tra PPExecution e Resource dovrebbe essere (n*:n*)
    // Resource.hasMany(ProductionPhaseExecution, {foreignKey: "idresource"});
    ProductionPhaseExecution.belongsTo(ExecutionResource, {foreignKey: "idexecutionresource"});
    ExecutionResource.hasMany(ProductionPhaseExecution, {foreignKey: "idexecutionresource"});
    Resource.belongsTo(ExecutionResource, {foreignKey: "idexecutionresource"});
    ExecutionResource.hasMany(Resource, {foreignKey: "idexecutionresource"});
    ProductionPhaseExecution.belongsTo(WorkCenter, {foreignKey: "idworkcenter"});
    WorkCenter.hasMany(ProductionPhaseExecution, {foreignKey: "idworkcenter"});
    ProductionPhaseExecution.belongsTo(ProductionPhase, {foreignKey: "idproductionphase"});
    ProductionPhase.hasMany(ProductionPhaseExecution, {foreignKey: "idproductionphase"})
    ProductionPhase.belongsTo(ProductionPhase, { foreignKey: "idproductionphase"}); //auto dipendenza
    ProductionPhase.hasMany(ProductionPhase, { foreignKey: "idproductionphase"}); //auto dipendenza
    ProductionPhase.belongsTo(ProductionOrder, {foreignKey: "idproductionorder"});
    ProductionOrder.hasMany(ProductionPhase, {foreignKey: "idproductionorder"});
    
    //SCHEMA ER 2
    //Product.belongsTo(SalesOrderItem, {foreignKey: "idorderitem"});
    //SalesOrderItem.hasMany(Product, {foreignKey: "idorderitem"}); 
    SalesOrderItem.belongsTo(Product, {foreignKey: "idproduct"});
    Product.hasMany(SalesOrderItem, {foreignKey: "idproduct"}); 
    
    ProductionOrder.belongsTo(SalesOrderItem, {foreignKey: "idorderitem"});
    SalesOrderItem.hasMany(ProductionOrder, {foreignKey: "idorderitem"}); 
    SalesOrderItem.belongsTo(SalesOrder, {foreignKey: "idsalesorder"});
    SalesOrder.hasMany(SalesOrderItem, {foreignKey: "idsalesorder"});


    // resource
    Equipment.belongsTo(Resource, {foreignKey: "idresource"});
    Resource.hasMany(Equipment, {foreignKey: "idresource"});
    Employee.belongsTo(Resource, {foreignKey: "idresource"});
    Resource.hasMany(Employee, {foreignKey: "idresource"});
    Software.belongsTo(Resource, {foreignKey: "idresource"});
    Resource.hasMany(Software, {foreignKey: "idresource"});
    
    
    // --------------------- ACTOR PERSPECTIVE ---------------------

    SalesOrder.belongsTo(SupplyChainClient, {foreignKey: "idclient"});
    SupplyChainClient.hasMany(SalesOrder, {foreignKey: "idclient"});
    SalesOrder.belongsTo(SupplyChainActor, {foreignKey: "idactor"});
    SupplyChainActor.hasMany(SalesOrder, {foreignKey: "idactor"});

    SupplyChainActor.belongsTo(ActorClient, {foreignKey: "idactorclient"});
    ActorClient.hasMany(SupplyChainActor, {foreignKey: "idactorclient"});

    SupplyChainClient.belongsTo(ActorClient, {foreignKey: "idactorclient"});
    ActorClient.hasMany(SupplyChainClient, {foreignKey: "idactorclient"});

    // SupplyChainClient.belongsTo(ClientDetails, {foreignKey: "iddetails"});
    // ClientDetails.hasOne(SupplyChainClient, {foreignKey: "iddetails"});

    SupplyChainActor.belongsTo(Supply, {foreignKey: "idsupply"});
    Supply.hasMany(SupplyChainActor, {foreignKey: "idsupply"});

    Supplyed.belongsTo(Supply, {foreignKey: "idsupply"});
    Supply.hasMany(Supplyed, {foreignKey: "idsupply"});

    // SupplyChainActor.belongsTo(SupplyChainActor, { foreignKey: "idactor"});
    // SupplyChainActor.hasMany(SupplyChainActor, { foreignKey: "idactor"});

    User.belongsTo(SupplyChainActor, {foreignKey: "idsupplychainactor"});
    SupplyChainActor.hasOne(User, {foreignKey: "idsupplychainactor"});
    UserCategory.belongsTo(User, {foreignKey: "iduser"});
    User.hasMany(UserCategory, {foreignKey: "iduser"});
    

    return {
        //ClientDetails,
        ActorClient,
        ContractWorkOrder,
        ContractWorkOrderItem,
        Employee,
        Equipment,
        ExecutionResource,
        PartcodeEbom,
        PartcodeMbom,
        Product,
        ProductDetails,
        ProductionOrder,
        ProductionPhase,
        ProductionPhaseExecution,
        PurchaseOrder,
        PurchaseOrderItem,
        Resource,
        SalesOrder,
        SalesOrderItem,
        Software,
        Supply,
        SupplyChainActor,
        SupplyChainClient,
        Supplyed,
        User,
        UserCategory,
        WorkCenter,
        VendorService
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;




