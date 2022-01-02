-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2021 at 11:42 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fisval_revisited_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `actorclient`
--

CREATE TABLE `actorclient` (
  `id` int(11) NOT NULL,
  `clientdetails` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contractworkorder`
--

CREATE TABLE `contractworkorder` (
  `id` int(11) NOT NULL,
  `idmbom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contractworkorderitem`
--

CREATE TABLE `contractworkorderitem` (
  `id` int(11) NOT NULL,
  `idworkorder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `idresource` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `idresource` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `executionresource`
--

CREATE TABLE `executionresource` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `partcodeebom`
--

CREATE TABLE `partcodeebom` (
  `id` int(11) NOT NULL,
  `idebom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `partcodembom`
--

CREATE TABLE `partcodembom` (
  `id` int(11) NOT NULL,
  `idebom` int(11) NOT NULL,
  `idmbom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `idebom` int(11) NOT NULL,
  `idmbom` int(11) NOT NULL,
  `iddetails` int(11) NOT NULL,
  `idorderitem` int(11) DEFAULT NULL,
  `iddeatils` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

CREATE TABLE `productdetails` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productionorder`
--

CREATE TABLE `productionorder` (
  `id` int(11) NOT NULL,
  `idmbom` int(11) DEFAULT NULL,
  `idworkorder` int(11) NOT NULL,
  `idpurchaseorder` int(11) DEFAULT NULL,
  `idorderitem` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productionphase`
--

CREATE TABLE `productionphase` (
  `id` int(11) NOT NULL,
  `idproductionphase` int(11) DEFAULT NULL,
  `idproductionorder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `productionphaseexecution`
--

CREATE TABLE `productionphaseexecution` (
  `id` int(11) NOT NULL,
  `idproductionphase` int(11) NOT NULL,
  `idworkcenter` int(11) DEFAULT NULL,
  `idexecutionresource` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorder`
--

CREATE TABLE `purchaseorder` (
  `id` int(11) NOT NULL,
  `idmbom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorderitem`
--

CREATE TABLE `purchaseorderitem` (
  `id` int(11) NOT NULL,
  `idorder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `resource`
--

CREATE TABLE `resource` (
  `id` int(11) NOT NULL,
  `idexecutionresource` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salesorder`
--

CREATE TABLE `salesorder` (
  `id` int(11) NOT NULL,
  `idactor` int(11) DEFAULT NULL,
  `idclient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salesorderitem`
--

CREATE TABLE `salesorderitem` (
  `id` int(11) NOT NULL,
  `idsalesorder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `software`
--

CREATE TABLE `software` (
  `id` int(11) NOT NULL,
  `idresource` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `id` int(11) NOT NULL,
  `supplierdetails` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplychainactor`
--

CREATE TABLE `supplychainactor` (
  `id` int(11) NOT NULL,
  `idsupply` int(11) DEFAULT NULL,
  `idactorclient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplychainclient`
--

CREATE TABLE `supplychainclient` (
  `id` int(11) NOT NULL,
  `idactorclient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplyed`
--

CREATE TABLE `supplyed` (
  `id` int(11) NOT NULL,
  `idsupply` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `idsupplychainactor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usercategory`
--

CREATE TABLE `usercategory` (
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workcenter`
--

CREATE TABLE `workcenter` (
  `id` int(11) NOT NULL,
  `idworkcenter` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actorclient`
--
ALTER TABLE `actorclient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contractworkorder`
--
ALTER TABLE `contractworkorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `make_external` (`idmbom`) USING BTREE;

--
-- Indexes for table `contractworkorderitem`
--
ALTER TABLE `contractworkorderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_work_order` (`idworkorder`) USING BTREE;

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emp_resource` (`idresource`) USING BTREE;

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equip_resource` (`idresource`) USING BTREE;

--
-- Indexes for table `executionresource`
--
ALTER TABLE `executionresource`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partcodeebom`
--
ALTER TABLE `partcodeebom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `part_of` (`idebom`) USING BTREE;

--
-- Indexes for table `partcodembom`
--
ALTER TABLE `partcodembom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `part_of_e` (`idebom`) USING BTREE,
  ADD KEY `part_of_m` (`idmbom`) USING BTREE;

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iddeatils` (`iddeatils`),
  ADD KEY `ebom_partcode` (`idebom`) USING BTREE,
  ADD KEY `mbom_partcode` (`idmbom`) USING BTREE,
  ADD KEY `product_details` (`iddetails`) USING BTREE,
  ADD KEY `sales_order_item` (`idorderitem`) USING BTREE;

--
-- Indexes for table `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productionorder`
--
ALTER TABLE `productionorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `make_internal` (`idmbom`) USING BTREE,
  ADD KEY `PO_supplire_work` (`idworkorder`) USING BTREE,
  ADD KEY `PO_supplire_purchase` (`idpurchaseorder`) USING BTREE,
  ADD KEY `PO_owner` (`idorderitem`) USING BTREE;

--
-- Indexes for table `productionphase`
--
ALTER TABLE `productionphase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subphase_of` (`idproductionphase`) USING BTREE,
  ADD KEY `production_order` (`idproductionorder`) USING BTREE;

--
-- Indexes for table `productionphaseexecution`
--
ALTER TABLE `productionphaseexecution`
  ADD PRIMARY KEY (`id`),
  ADD KEY `production_phase` (`idproductionphase`) USING BTREE,
  ADD KEY `work_center` (`idworkcenter`) USING BTREE,
  ADD KEY `execution_resource` (`idexecutionresource`) USING BTREE;

--
-- Indexes for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buy` (`idmbom`) USING BTREE;

--
-- Indexes for table `purchaseorderitem`
--
ALTER TABLE `purchaseorderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order` (`idorder`) USING BTREE;

--
-- Indexes for table `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `execution_resource` (`idexecutionresource`) USING BTREE;

--
-- Indexes for table `salesorder`
--
ALTER TABLE `salesorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supply_chain_actor` (`idactor`) USING BTREE,
  ADD KEY `supply_chain_client` (`idclient`) USING BTREE;

--
-- Indexes for table `salesorderitem`
--
ALTER TABLE `salesorderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_order` (`idsalesorder`) USING BTREE;

--
-- Indexes for table `software`
--
ALTER TABLE `software`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sw_resource` (`idresource`) USING BTREE;

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplychainactor`
--
ALTER TABLE `supplychainactor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_of` (`idsupply`) USING BTREE,
  ADD KEY `from_actor_to_client` (`idactorclient`) USING BTREE;

--
-- Indexes for table `supplychainclient`
--
ALTER TABLE `supplychainclient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from_client_to_actor` (`idactorclient`) USING BTREE;

--
-- Indexes for table `supplyed`
--
ALTER TABLE `supplyed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplyed_by` (`idsupply`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplychainactor` (`idsupplychainactor`) USING BTREE;

--
-- Indexes for table `usercategory`
--
ALTER TABLE `usercategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`iduser`) USING BTREE;

--
-- Indexes for table `workcenter`
--
ALTER TABLE `workcenter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `composed_of` (`idworkcenter`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actorclient`
--
ALTER TABLE `actorclient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contractworkorder`
--
ALTER TABLE `contractworkorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contractworkorderitem`
--
ALTER TABLE `contractworkorderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `executionresource`
--
ALTER TABLE `executionresource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partcodeebom`
--
ALTER TABLE `partcodeebom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partcodembom`
--
ALTER TABLE `partcodembom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productdetails`
--
ALTER TABLE `productdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productionorder`
--
ALTER TABLE `productionorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productionphase`
--
ALTER TABLE `productionphase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productionphaseexecution`
--
ALTER TABLE `productionphaseexecution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchaseorderitem`
--
ALTER TABLE `purchaseorderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resource`
--
ALTER TABLE `resource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salesorder`
--
ALTER TABLE `salesorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salesorderitem`
--
ALTER TABLE `salesorderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `software`
--
ALTER TABLE `software`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplychainactor`
--
ALTER TABLE `supplychainactor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplychainclient`
--
ALTER TABLE `supplychainclient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplyed`
--
ALTER TABLE `supplyed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usercategory`
--
ALTER TABLE `usercategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workcenter`
--
ALTER TABLE `workcenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contractworkorder`
--
ALTER TABLE `contractworkorder`
  ADD CONSTRAINT `contractworkorder_ibfk_1` FOREIGN KEY (`idmbom`) REFERENCES `partcodembom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contractworkorderitem`
--
ALTER TABLE `contractworkorderitem`
  ADD CONSTRAINT `contractworkorderitem_ibfk_1` FOREIGN KEY (`idworkorder`) REFERENCES `contractworkorder` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`idresource`) REFERENCES `resource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`idresource`) REFERENCES `resource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `partcodeebom`
--
ALTER TABLE `partcodeebom`
  ADD CONSTRAINT `partcodeebom_ibfk_1` FOREIGN KEY (`idebom`) REFERENCES `partcodeebom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `partcodembom`
--
ALTER TABLE `partcodembom`
  ADD CONSTRAINT `partcodembom_ibfk_1` FOREIGN KEY (`idebom`) REFERENCES `partcodeebom` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `partcodembom_ibfk_2` FOREIGN KEY (`idmbom`) REFERENCES `partcodembom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idebom`) REFERENCES `partcodeebom` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`idmbom`) REFERENCES `partcodembom` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`idorderitem`) REFERENCES `salesorderitem` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`iddeatils`) REFERENCES `productdetails` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productionorder`
--
ALTER TABLE `productionorder`
  ADD CONSTRAINT `productionorder_ibfk_1` FOREIGN KEY (`idmbom`) REFERENCES `partcodembom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productionorder_ibfk_2` FOREIGN KEY (`idworkorder`) REFERENCES `contractworkorderitem` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productionorder_ibfk_3` FOREIGN KEY (`idpurchaseorder`) REFERENCES `purchaseorderitem` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productionorder_ibfk_4` FOREIGN KEY (`idorderitem`) REFERENCES `salesorderitem` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productionphase`
--
ALTER TABLE `productionphase`
  ADD CONSTRAINT `productionphase_ibfk_1` FOREIGN KEY (`idproductionphase`) REFERENCES `productionphase` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productionphase_ibfk_2` FOREIGN KEY (`idproductionorder`) REFERENCES `productionorder` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `productionphaseexecution`
--
ALTER TABLE `productionphaseexecution`
  ADD CONSTRAINT `productionphaseexecution_ibfk_1` FOREIGN KEY (`idproductionphase`) REFERENCES `productionphase` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productionphaseexecution_ibfk_2` FOREIGN KEY (`idworkcenter`) REFERENCES `workcenter` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productionphaseexecution_ibfk_3` FOREIGN KEY (`idexecutionresource`) REFERENCES `executionresource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  ADD CONSTRAINT `purchaseorder_ibfk_1` FOREIGN KEY (`idmbom`) REFERENCES `partcodembom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `purchaseorderitem`
--
ALTER TABLE `purchaseorderitem`
  ADD CONSTRAINT `purchaseorderitem_ibfk_1` FOREIGN KEY (`idorder`) REFERENCES `purchaseorder` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `resource`
--
ALTER TABLE `resource`
  ADD CONSTRAINT `resource_ibfk_1` FOREIGN KEY (`idexecutionresource`) REFERENCES `executionresource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `salesorder`
--
ALTER TABLE `salesorder`
  ADD CONSTRAINT `salesorder_ibfk_1` FOREIGN KEY (`idactor`) REFERENCES `supplychainactor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `salesorder_ibfk_2` FOREIGN KEY (`idclient`) REFERENCES `supplychainclient` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `salesorderitem`
--
ALTER TABLE `salesorderitem`
  ADD CONSTRAINT `salesorderitem_ibfk_1` FOREIGN KEY (`idsalesorder`) REFERENCES `salesorder` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `software`
--
ALTER TABLE `software`
  ADD CONSTRAINT `software_ibfk_1` FOREIGN KEY (`idresource`) REFERENCES `resource` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `supplychainactor`
--
ALTER TABLE `supplychainactor`
  ADD CONSTRAINT `supplychainactor_ibfk_1` FOREIGN KEY (`idsupply`) REFERENCES `supply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `supplychainactor_ibfk_2` FOREIGN KEY (`idactorclient`) REFERENCES `actorclient` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `supplychainclient`
--
ALTER TABLE `supplychainclient`
  ADD CONSTRAINT `supplychainclient_ibfk_1` FOREIGN KEY (`idactorclient`) REFERENCES `actorclient` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `supplyed`
--
ALTER TABLE `supplyed`
  ADD CONSTRAINT `supplyed_ibfk_1` FOREIGN KEY (`idsupply`) REFERENCES `supply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idsupplychainactor`) REFERENCES `supplychainactor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `usercategory`
--
ALTER TABLE `usercategory`
  ADD CONSTRAINT `usercategory_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
